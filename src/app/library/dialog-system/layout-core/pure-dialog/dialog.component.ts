import {AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, HostListener, OnDestroy, Type, ViewChild} from '@angular/core';
import {InsertionDirective} from '../../dialog-definition/insertion.directive';
import {Subject, Subscription} from 'rxjs';
import {DialogRef} from '../../dialog-definition/dialog-ref';
import {DialogClass} from '../../dialog-definition/dialog-class';
import {DialogInterface} from '../../dialog-definition/dialog-interface';
import {fadeInOut} from '../../../animation/fade-in-out.animation';
import {DialogLoaderDirective} from '../../dialog-definition/dialog-loader.directive';
import {DefaultModalLoaderComponent} from '../../default-loader/default-modal-loader.component';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

@Component({
    selector   : 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls  : ['./dialog.component.scss'],
    animations : [fadeInOut(0, 1)]
})
export class DialogComponent implements AfterViewInit, OnDestroy {
    componentRef: ComponentRef<any>;
    childComponentType: Type<any>;
    dialogConfig: DialogInterface.IDialogConfigItem;
    loader: boolean               = true;
    contentIsLoaded: boolean      = false;
    showLoader: boolean           = true;
    fadeInOutAnimation: string    = 'open';
    loaderComponentRef: ComponentRef<this>;
    loaderComponent: Type<any>    = DefaultModalLoaderComponent;
    subscriptions: Subscription[] = [];
    
    @ViewChild(InsertionDirective, {static: true}) insertionPoint: InsertionDirective;
    @ViewChild(DialogLoaderDirective, {static: true}) loaderInsertionPoint: DialogLoaderDirective;
    
    private readonly _onClose: any = new Subject<any>();
    public onClose: any            = this._onClose.asObservable();
    
    constructor(
        private platformLocation: PlatformLocation,
        private componentFactoryResolver: ComponentFactoryResolver,
        public dialog: DialogRef,
        private cd: ChangeDetectorRef,
        private router: Router) {
    }
    
    ngAfterViewInit(): void {
        
        this.router.events.subscribe((val) => {
            this.closeDialogCore('close-animate-fast');
        });
        
        if (this.dialogConfig.ConfirmBox || this.dialogConfig.AlertBox || this.dialogConfig.ToastMessage) {
            this.showLoader = false;
        }
        
        this.subscriptions.push(this.dialog.buttonList.subscribe((_ButtonList) => {
            this.dialogConfig.CustomButtonList = _ButtonList;
        }));
        this.loaderComponent = (this.dialogConfig.Loader ? this.dialogConfig.Loader : this.loaderComponent);
        this.loadLoaderComponent(this.loaderComponent);
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
        this.subscriptions.forEach(sub => sub.unsubscribe());
        
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
    
    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    
    onDialogClicked(evt: MouseEvent): void {
        /* evt.stopPropagation();*/
        /*  evt.preventDefault();*/
    }
    
    loadLoaderComponent(_LoaderRef: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(_LoaderRef);
        const viewContainerRef = this.loaderInsertionPoint.viewContainerRef;
        viewContainerRef.clear();
        
        this.loaderComponentRef = viewContainerRef.createComponent(componentFactory);
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
        this.fadeInOutAnimation = _ClosingAnimation;
        const timer             = _ClosingAnimation === 'close-animate-slow' ? 1400 : 150;
        // give time for the fade out animation before close
        
        await this.timeout(timer);
        
        if (this.componentRef.instance.fullResponse) {
            const fullResponse: DialogClass.ConfirmBoxResponse = new DialogClass.ConfirmBoxResponse(this.componentRef.instance.fullResponse.Response.DialogUniqueID);
            fullResponse.Response.Action                       = false;
            this.dialog.close(fullResponse);
        }
    }
    
    closeDialogLoader(): void {
        this.contentIsLoadedPromise().then((resp) => {
            this.loader = false;
        });
        
    }
    
    isToastMessage(): any {
        // ako je podešeno da je toast potuka sama se treba maknuti za n sekundi osim ako je postavka da mora miti zatvorena tipkom
        if (this.dialogConfig.ToastMessage && this.dialogConfig.ToastMessageConfig.AutoClose) {
            setTimeout(() => {
                this.closeDialogCore('close-animate-slow');
            }, this.dialogConfig.ToastMessageConfig.AutoCloseDelay); // toast message time
        }
    }
    
    onCustomButton(_Button: DialogInterface.ICustomButtonConfig): void {
        this.componentRef.instance.fullResponse.Response.Action = _Button.UniqueKeyAction;
        this.dialog.customButtonOnChange(_Button);
    }
    
}
