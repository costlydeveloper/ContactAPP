import {Component, OnInit} from '@angular/core';
import {enterDialogAnimation} from '../../../../library/animation/enter-dialog.animations';
import {LayoutAbstraction, LayoutCommon} from '../../../../dependencies/layout';
import {InformationDependenciesContact} from '../../../../modules/INFORMATION/dependencies/contact';
import {Global} from '../../../../dependencies/global';
import {LibraryValidation} from '../../../../library/validation/vaidation';
import {Router} from '@angular/router';
import {DialogClass, DialogData} from '../../../../library/dialog-system/dialog-definition/dialog-class';
import {DialogRef} from '../../../../library/dialog-system/dialog-definition/dialog-ref';
import {INFORMATION} from '../../../../modules/INFORMATION/models';

@Component({
    selector   : 'app-contact-container',
    templateUrl: './contact-container.component.html',
    styleUrls  : ['./contact-container.component.scss'],
    animations : [enterDialogAnimation]
})
export class ContactContainerComponent extends LayoutAbstraction.Class.Container<InformationDependenciesContact.Interface.IContainerInputData> implements OnInit {
    
    coreContainer: InformationDependenciesContact.Interface.IContainerCore = new InformationDependenciesContact.Class.ContainerCore();
    contactValidatorList: Global.Interface.Layout.IValidation[]            = [];
    
    // region *** LibraryValidation ***
    stringValidation: LibraryValidation.Class.StringValidation = new LibraryValidation.Class.StringValidation();
    numberValidation: LibraryValidation.Class.NumberValidation = new LibraryValidation.Class.NumberValidation();
    
    // endregion
    
    constructor(private router: Router,
                public dialogData: DialogData,
                public dialog: DialogRef) {
        super();
        this.isDialog = !!Object.keys(this.dialogData).length;
    }
    
    ngOnInit(): void {
        if (this.isDialog) {
            this.fullResponse = new DialogClass.ConfirmBoxResponse(this.dialogData.CustomData.DialogConfig.DialogUniqueID);
            this.inputData    = this.dialogData.CustomData;
            this.onFormButtonClickListener();
        } else { // route
            this.inputData = this.router.getCurrentNavigation() ? this.router.getCurrentNavigation().extras.state as LayoutCommon.Interface.IContainerInput<InformationDependenciesContact.Interface.IContainerInputData> : null;
        }
        
        if (this.inputData.Mode === 'edit') {
            this.coreContainer.ContainerInputData.Contact.copyValuesFrom(this.inputData.ContainerInputData.Contact);
            this.coreContainer.ContainerInputDataReference = this.inputData.ContainerInputData;
        }
        
        this.coreContainer.dataFetch().then(result => {
            // dohvaćene su sve liste
            this.closeLoader();
            this.contentIsReady = true;
        });
        
    }
    
    closeLoader(): void {
        if (this.isDialog) {
            this.dialog.closeLoader(this.dialogData.CustomData.DialogConfig.DialogUniqueID);
        } else {
            // close loader route
        }
    }
    
    formDataCollect(_ChangedObject: any): void {
        if (_ChangedObject instanceof INFORMATION.Class.Contact.Basic) {
            this.coreContainer.ContainerInputData.Contact = _ChangedObject;
        }
    }
    
    // region *** button logic ***
    
    onCancel(): void {
        this.contactValidatorList       = [];
        this.fullResponse.Response.Data = null;
        
        this.dialog.close(this.fullResponse);
    }
    
    onCreate(): void {
        
        
        if (this.coreContainer.ContainerInputData.Contact.isValid(this.contactValidatorList)) {
            
            this.fullResponse.Response.Success = true;
            this.fullResponse.Response.Data    = {
                Payload: this.coreContainer.ContainerInputData.Contact
            };
            
            this.dialog.close(this.fullResponse);
            
        } else {
            this.formIsNotValidAlert();
        }
    }
    
    onEdit(): void {
        
        
        if (this.coreContainer.ContainerInputData.Contact.isValid(this.contactValidatorList)) {
            
            this.coreContainer.ContainerInputDataReference.Contact.copyValuesFrom(this.coreContainer.ContainerInputData.Contact);
            
            this.fullResponse.Response.Success = true;
            this.fullResponse.Response.Data    = {
                Payload: this.coreContainer.ContainerInputData.Contact
            };
            
            this.dialog.close(this.fullResponse);
            
        } else {
            this.formIsNotValidAlert();
        }
    }
    
    onFormButtonClickListener(): void {
        this.subscriptions.push(this.dialog.buttonOnChange.subscribe((_Button) => {
            
            this.contactValidatorList = [
                {
                    PropertyName    : 'Title',
                    ValidationMethod: this.stringValidation.length(3, 50),
                    IsValid         : false
                },
                {
                    PropertyName    : 'ContactCategoryID',
                    ValidationMethod: this.numberValidation.isNumber(),
                    IsValid         : false
                }
            ];
            
            if (_Button.UniqueKeyAction === 'cancel') {
                this.onCancel();
            } else if (_Button.UniqueKeyAction === 'create') {
                this.onCreate();
            } else if (_Button.UniqueKeyAction === 'edit') {
                this.onEdit();
            }
            
        }));
    }
    
    // endregion
    
}
