import {Component} from '@angular/core';
import {DialogRef} from '../../dialog-definition/dialog-ref';
import {DialogInterface} from '../../dialog-definition/dialog-interface';
import {DialogClass, DialogData} from '../../dialog-definition/dialog-class';

@Component({
    selector   : 'app-confirm-box',
    templateUrl: './confirm-box.component.html',
    styleUrls  : ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent {
    
    dialogConfig: DialogInterface.IDialogConfigItem;
    fullResponse: DialogClass.ConfirmBoxResponse;
    showIcon: boolean = false;
    
    constructor(public dialogData: DialogData, public dialog: DialogRef) {
        
        
        this.fullResponse = new DialogClass.ConfirmBoxResponse(this.dialogData.CustomData.DialogConfig.DialogUniqueID);
        this.dialogConfig = this.dialogData.CustomData.DialogConfig;
        
        this.showIcon = (
            this.dialogConfig.ColorType === 2
            || this.dialogConfig.ColorType === 3
            || this.dialogConfig.ColorType === 4
            || this.dialogConfig.ColorType === 5
        );
    }
    
    
    onClose(): void {
        this.fullResponse.Response.Action  = false;
        this.fullResponse.Response.Success = false;
        this.dialog.close(this.fullResponse);
    }
    
    onConfirm(): void {
        this.fullResponse.Response.Action  = true;
        this.fullResponse.Response.Success = true;
        this.dialog.close(this.fullResponse);
    }
}
