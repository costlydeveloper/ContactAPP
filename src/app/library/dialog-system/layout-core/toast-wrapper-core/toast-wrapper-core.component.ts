import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, Renderer2, Type, ViewChild} from '@angular/core';
import {DialogInterface} from '../../dialog-definition/dialog-interface';
import {InsertionDirective} from '../../dialog-definition/insertion.directive';
import {Subject} from 'rxjs';
import {DialogRef} from '../../dialog-definition/dialog-ref';
import {DialogClass} from '../../dialog-definition/dialog-class';
import {fadeInOut} from '../../../animation/fade-in-out.animation';
import {DefaultModalLoaderComponent} from '../../default-loader/default-modal-loader.component';

@Component({
    selector   : 'app-toast-wrapper-core',
    templateUrl: './toast-wrapper-core.component.html',
    styleUrls  : ['./toast-wrapper-core.component.scss'],
    animations : [fadeInOut(0, 0.9)]
})
export class ToastWrapperCoreComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    
    componentRef: ComponentRef<any>;
    childComponentType: Type<any>;
    dialogConfig: DialogInterface.IDialogConfigItem;
    loader: boolean            = true;
    fadeInOutAnimation: string = 'open';
    loaderComponentRef: ComponentRef<this>;
    loaderComponent: Type<any> = DefaultModalLoaderComponent;
    contentIsLoaded: boolean   = false;
    showLoader: boolean        = true;
    
    @ViewChild(InsertionDirective, {static: true}) insertionPoint: InsertionDirective;
    @ViewChild('overlayToast', {static: true}) overlayToast: ElementRef;
    @ViewChild('componentContainer', {static: true}) componentContainer: ElementRef;
    
    private readonly _onClose: any = new Subject<any>();
    public onClose: any            = this._onClose.asObservable();
    
    // and this:
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public dialog: DialogRef,
        private cd: ChangeDetectorRef,
        private renderer: Renderer2
    ) {
    }
    
    ngAfterViewChecked(): void {
    
    }
    
    ngAfterViewInit(): void {
        
        if (this.dialogConfig.ConfirmBox || this.dialogConfig.AlertBox || this.dialogConfig.ToastMessage) {
            this.showLoader = false;
        }
        
        this.loaderComponent = (this.dialogConfig.Loader ? this.dialogConfig.Loader : this.loaderComponent);
        this.loadChildComponent(this.childComponentType);
        this.cd.detectChanges();
        this.isToastMessage();
        this.contentIsLoaded = true;
    }
    
    ngOnDestroy(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        if (this.loaderComponentRef) {
            this.loaderComponentRef.destroy();
        }
    }
    
    onOverlayClicked(evt: MouseEvent): void {
        // close the pure-dialog
        if (evt['path'][0].className.includes('overlay')) {
            this.closeDialogCore('close-animate-fast');
        }
    }
    
    async contentIsLoadedPromise(): Promise<boolean> {
        
        let securityLogoutCount = 0;
        while (!this.contentIsLoaded) {
            securityLogoutCount++;
            if (securityLogoutCount > 30) {
                return;
            } else {
                await this.timeout(500);
            }
            
        }
        return true;
    }
    
    onDialogClicked(evt: MouseEvent): void {
        evt.stopPropagation();
        evt.preventDefault();
    }
    
    loadChildComponent(componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        
        const viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();
        
        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }
    
    timeout(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async closeDialogCore(_ClosingAnimation: string): Promise<any> {
        return await new Promise(resolve => {
            resolve('ok');
        });
    }
    
    fadeOutAnimation(_ClosingAnimation: string): void {
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer: number     = _ClosingAnimation === 'close-animate-slow' ? 1400 : 150;
        setTimeout(() => {
            
            this.toastClose();
        }, timer); // toast message time
    }
    
    toastClose(): void {
        const fullResponse: DialogClass.ConfirmBoxResponse = new DialogClass.ConfirmBoxResponse(this.componentRef.instance.fullResponse.Response.DialogUniqueID);
        fullResponse.Response.Action                       = false;
        this.dialog.close(fullResponse);
    }
    
    closeDialogLoader(): void {
        this.contentIsLoadedPromise().then((resp) => {
            this.loader = false;
        });
        
    }
    
    isToastMessage(): any {
        // ako je podešeno da je toast potuka sama se treba maknuti za n sekundi osim ako je postavka da mora biti zatvorena tipkom
        if (this.dialogConfig.ToastMessage && this.dialogConfig.ToastMessageConfig.AutoClose) {
            setTimeout(() => {
                this.fadeOutAnimation('close-animate-slow');
            }, this.dialogConfig.ToastMessageConfig.AutoCloseDelay); // toast message time
        }
    }
    
    onCustomButton(_Button: DialogInterface.ICustomButtonConfig): void {
        
        this.componentRef.instance.fullResponse.Response.Action = _Button.UniqueKeyAction;
        
        this.dialog.close(this.componentRef.instance.fullResponse);
        
    }
    
}
