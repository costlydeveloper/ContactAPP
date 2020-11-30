import {NgModule} from '@angular/core';
import {InsertionDirective} from './insertion.directive';
import {DialogService} from './dialog.service';
import {DialogLoaderDirective} from './dialog-loader.directive';
import {DefaultModalLoaderComponent} from '../default-loader/default-modal-loader.component';
import {ToastWrapperCoreComponent} from '../layout-core/toast-wrapper-core/toast-wrapper-core.component';
import {ConfirmBoxComponent} from '../layout-types/confirm-box/confirm-box.component';
import {ToastMessageComponent} from '../layout-types/toast-message/toast-message.component';
import {DialogComponent} from '../layout-core/pure-dialog/dialog.component';
import {ToastService} from './toast.service';
import {CommonModule} from '@angular/common';

@NgModule({
    
    declarations: [
        DialogComponent,
        InsertionDirective,
        DialogLoaderDirective,
        DefaultModalLoaderComponent,
        ToastWrapperCoreComponent,
        ConfirmBoxComponent,
        ToastMessageComponent,
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        DialogLoaderDirective,
        InsertionDirective
    ],
    providers   : [
        DialogService,
        ToastService
    ]
})
export class PopupDialogModule {
}
