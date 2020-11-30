import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {DialogClass, DialogData} from './dialog-class';
import {DialogInjector} from './dialog-injector';
import {DialogRef} from './dialog-ref';
import {ToastInterface} from './dialog-interface';
import {DialogComponent} from '../layout-core/pure-dialog/dialog.component';
import {ToastWrapperCoreComponent} from '../layout-core/toast-wrapper-core/toast-wrapper-core.component';

@Injectable()
export class ToastService {
    
    static instance: ToastService;
    toastComponentRefList: ComponentRef<DialogComponent>[] = [];
    bufferToastRawList: ToastInterface.ToastRaw[]          = [];
    startInterval: boolean                                 = false;
    intervalIsReady: boolean                               = true;
    allowedMessagesAtOnce: number                          = 5;
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        if (!ToastService.instance) {
            ToastService.instance = this;
        }
        return ToastService.instance;
    }
    
    appendDialogComponentToBody(_ToastRaw: ToastInterface.ToastRaw): ComponentRef<any> {
        
        const customData            = new DialogClass.DialogConfig(_ToastRaw.Config);
        _ToastRaw.Config.CustomData = {..._ToastRaw.Config.CustomData, ...customData};
        
        
        // region *** Close Dialog Listener ***
        const sub = _ToastRaw.DialogRef.afterClosed.subscribe((response: DialogClass.ConfirmBoxResponse) => {
            this.findAndRemoveDialogComponentFromBody(response.Response.DialogUniqueID);
            sub.unsubscribe();
        });
        // endregion
        
        // region *** Loader Listener ***
        const closeLoader = _ToastRaw.DialogRef.afterLoader.subscribe((_DialogUniqueID: string) => {
            if (_DialogUniqueID) {
                const modalIndex = this.findDialogComponentRefIndex(_DialogUniqueID);
                if (modalIndex !== -1) {
                    // loader closing
                    this.toastComponentRefList[modalIndex].instance.closeDialogLoader();
                }
            }
            closeLoader.unsubscribe();
        });
        // endregion
        
        
        // provjera da li dialog postoji u ref listi(tj. da li je već otvoren)
        const newlyCreatedDialogExistIndex = this.findDialogComponentRefIndex(customData.DialogConfig.DialogUniqueID);
        
        if (newlyCreatedDialogExistIndex === -1) {
            const componentRef = this.createComponent(_ToastRaw.Map, customData);
            
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            this.appendToDOM(domElem);
            return componentRef;
        }
    }
    
    public async openToast(_ComponentType: Type<any>, _Config: DialogData): Promise<DialogRef> {
        return await new Promise((resolve) => {
            
            // create a map with the config
            const map: WeakMap<object, any> = new WeakMap();
            map.set(DialogData, _Config);
            
            // add the DialogRef to dependency injection
            const dialogRef = new DialogRef();
            map.set(DialogRef, dialogRef);
            
            const toastRaw: ToastInterface.ToastRaw = {
                Config       : _Config,
                Map          : map,
                DialogRef    : dialogRef,
                ComponentType: _ComponentType
            };
            
            if (this.appearanceNumberLogic(toastRaw)) {
                resolve(dialogRef);
            }
            
            if (this.bufferToastRawList.length) {
                this.bufferInterval().then(response => {
                    resolve(response);
                });
            }
        });
        
    }
    
    async bufferInterval(): Promise<any> {
        return await new Promise((resolve) => {
            this.startInterval = !!this.bufferToastRawList.length;
            
            if (this.intervalIsReady && this.startInterval) {
                this.intervalIsReady = false;
                let time             = 1;
                
                const interval = setInterval(() => {
                    if (time <= 500) {
                        
                        if (this.bufferToastRawList.length) {
                            if (this.appearanceNumberLogic(this.bufferToastRawList[0], false)) {
                                resolve(this.bufferToastRawList[0].DialogRef);
                                this.bufferToastRawList.splice(0, 1);
                            }
                        } else {
                            clearInterval(interval);
                            this.intervalIsReady = true;
                        }
                        
                        time++;
                    } else {
                        clearInterval(interval);
                        this.intervalIsReady    = true;
                        this.bufferToastRawList = [];
                    }
                }, 300);
            }
        });
    }
    
    private appearanceNumberLogic(_ToastRaw: ToastInterface.ToastRaw, _PushInBuffer: boolean = true): boolean {
        if (this.toastComponentRefList.length < this.allowedMessagesAtOnce) {
            const componentRef = this.appendDialogComponentToBody(_ToastRaw);
            this.toastComponentRefList.push(componentRef);
            componentRef.instance.childComponentType = _ToastRaw.ComponentType;
            return true;
        } else {
            if (_PushInBuffer) {
                this.bufferToastRawList.push(_ToastRaw);
            }
            return false;
        }
    }
    
    private appendToDOM(_DomElem: HTMLElement): void {
        const targetNode: HTMLElement = document.getElementById('toast-wrapper');
        targetNode.prepend(_DomElem);
    }
    
    private createComponent(_Map: WeakMap<object, any>, _CustomData: DialogClass.DialogConfig): ComponentRef<any> {
        let componentFactory;
        
        componentFactory                   = this.componentFactoryResolver.resolveComponentFactory(ToastWrapperCoreComponent);
        const componentRef                 = componentFactory.create(new DialogInjector(this.injector, _Map));
        componentRef.instance.dialogConfig = _CustomData.DialogConfig;
        this.appRef.attachView(componentRef.hostView);
        
        return componentRef;
    }
    
    private findAndRemoveDialogComponentFromBody(_DialogUniqueID: string): void {
        const modalIndex = this.findDialogComponentRefIndex(_DialogUniqueID);
        this.removeDialogComponentFromBody(modalIndex);
    }
    
    private findDialogComponentRefIndex(_DialogUniqueID: string): number {
        return this.toastComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.dialogConfig.DialogUniqueID;
        });
    }
    
    private removeDialogComponentFromBody(_DialogComponentRefIndex: number): void {
        
        if (_DialogComponentRefIndex !== -1) {
            this.toastComponentRefList[_DialogComponentRefIndex].instance.closeDialogCore('close-animate-fast').then((resp) => {
                this.appRef.detachView(this.toastComponentRefList[_DialogComponentRefIndex].hostView);
                this.toastComponentRefList[_DialogComponentRefIndex].destroy();
                this.toastComponentRefList.splice(_DialogComponentRefIndex, 1);
                
            });
        }
    }
    
    
}
