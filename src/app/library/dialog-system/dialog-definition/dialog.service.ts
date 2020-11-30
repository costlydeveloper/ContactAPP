import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {DialogClass, DialogData} from './dialog-class';
import {DialogInjector} from './dialog-injector';
import {DialogRef} from './dialog-ref';
import {DialogInterface} from './dialog-interface';
import {DialogComponent} from '../layout-core/pure-dialog/dialog.component';

@Injectable()
export class DialogService {
    
    static instance: DialogService;
    dialogComponentRef: ComponentRef<DialogComponent>[] = [];
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        if (!DialogService.instance) {
            DialogService.instance = this;
        }
        return DialogService.instance;
    }
    
    public appendDialogComponentToBody(config: DialogData): DialogRef {
        
        const customData  = new DialogClass.DialogConfig(config);
        config.CustomData = {...config.CustomData, ...customData};
        
        const map = new WeakMap();
        map.set(DialogData, config);
        
        const dialogRef = new DialogRef();
        map.set(DialogRef, dialogRef);
        
        const sub = dialogRef.afterClosed.subscribe((response: DialogClass.ConfirmBoxResponse) => {
            this.findAndRemoveDialogComponentFromBody(response.Response.DialogUniqueID);
            sub.unsubscribe();
        });
        
        // close loader
        const closeLoader = dialogRef.afterLoader.subscribe((_DialogUniqueID: string) => {
            if (_DialogUniqueID) {
                const modalIndex = this.findDialogComponentRefIndex(_DialogUniqueID);
                if (modalIndex !== -1) {
                    this.dialogComponentRef[modalIndex].instance.closeDialogLoader();
                }
            }
            
            closeLoader.unsubscribe();
        });
        
        let componentFactory;
        
        // region *** creation of a dialog ***
        
        // provjera da li dialog postoji u ref listi(tj. da li je već otvoren)
        const newlyCreatedDialogExistIndex = this.findDialogComponentRefIndex(customData.DialogConfig.DialogUniqueID);
        
        if (newlyCreatedDialogExistIndex === -1) {
            
            componentFactory                   = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
            // use our new injector
            const componentRef                 = componentFactory.create(new DialogInjector(this.injector, map));
            // fill dialogConfig in pure-dialog.component.ts
            componentRef.instance.dialogConfig = customData.DialogConfig;
            // const componentRef = componentFactory.create(this.injector);
            
            this.appRef.attachView(componentRef.hostView);
            
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
            
            this.dialogComponentRef.push(componentRef);
            this.dialogComponentRef.forEach((componentReference) => {
                const sub2 = componentReference.instance.onClose.subscribe((response: DialogInterface.IDialogConfigItem) => {
                    this.findAndRemoveDialogComponentFromBody(response.DialogUniqueID);
                    sub2.unsubscribe();
                });
            });
        }
        // endregion
        
        return dialogRef;
    }
    
    public open(_ComponentType: Type<any>, _Config: DialogData): any {
        
        const dialogRef = this.appendDialogComponentToBody(_Config);
        
        this.dialogComponentRef.forEach((componentReference) => {
            componentReference.instance.childComponentType = _ComponentType;
        });
        
        return dialogRef;
    }
    
    private findAndRemoveDialogComponentFromBody(_DialogUniqueID: string): void {
        const modalIndex = this.findDialogComponentRefIndex(_DialogUniqueID);
        this.removeDialogComponentFromBody(modalIndex);
    }
    
    // region *** Workers Helpers ***
    
    private findDialogComponentRefIndex(_DialogUniqueID: string): number {
        
        return this.dialogComponentRef.findIndex((item) => {
            return _DialogUniqueID === item.instance.componentRef.instance.fullResponse.Response.DialogUniqueID;
        });
    }
    
    private removeDialogComponentFromBody(_DialogComponentRefIndex: number): void {
        if (_DialogComponentRefIndex !== -1) {
            
            this.dialogComponentRef[_DialogComponentRefIndex].instance.closeDialogCore('close-animate-fast').then((resp) => {
                this.appRef.detachView(this.dialogComponentRef[_DialogComponentRefIndex].hostView);
                this.dialogComponentRef[_DialogComponentRefIndex].destroy();
                this.dialogComponentRef.splice(_DialogComponentRefIndex, 1);
            });
        }
    }
    
    // endregion
    
    
}
