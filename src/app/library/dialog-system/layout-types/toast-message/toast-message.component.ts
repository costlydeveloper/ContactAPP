import {Component} from '@angular/core';
import {DialogRef} from '../../dialog-definition/dialog-ref';
import {DialogInterface} from '../../dialog-definition/dialog-interface';
import {DialogClass, DialogData} from '../../dialog-definition/dialog-class';

@Component({
    selector   : 'app-toast-message',
    templateUrl: './toast-message.component.html',
    styleUrls  : ['./toast-message.component.scss']
})
export class ToastMessageComponent {
    
    dialogConfig: DialogInterface.IDialogConfigItem;
    fullResponse: DialogClass.ConfirmBoxResponse;
    
    constructor(public dialogData: DialogData, public dialog: DialogRef) {
        this.dialogConfig = this.dialogData.CustomData.DialogConfig;
        this.fullResponse = new DialogClass.ConfirmBoxResponse(this.dialogData.CustomData.DialogConfig.DialogUniqueID);
    }
    
    onClose(): void {
        this.fullResponse.Response.Action  = false;
        this.fullResponse.Response.Success = false;
        this.dialog.close(this.fullResponse);
    }
    
    onCustomButton(_Button: DialogInterface.ICustomButtonConfig): void {
        
        this.fullResponse.Response.Data    = _Button.Payload;
        this.fullResponse.Response.Action  = _Button.UniqueKeyAction;
        this.fullResponse.Response.Success = _Button.hasOwnProperty('Success') ? _Button.Success : true;
        this.dialog.close(this.fullResponse);
    }
    
}
