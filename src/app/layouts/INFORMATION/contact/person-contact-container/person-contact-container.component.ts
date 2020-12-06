import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutAbstraction, LayoutCommon} from '../../../../dependencies/layout';
import {INFORMATION} from '../../../../modules/INFORMATION/models';
import {Global} from '../../../../dependencies/global';
import {LibraryValidation} from '../../../../library/validation/vaidation';
import {InformationDependenciesPersonContact} from '../../../../modules/INFORMATION/dependencies/contact-person';
import {InformationDependenciesContact} from '../../../../modules/INFORMATION/dependencies/contact';
import {DialogInterface} from '../../../../library/dialog-system/dialog-definition/dialog-interface';

@Component({
    selector   : 'app-contact-container',
    templateUrl: './person-contact-container.component.html',
    styleUrls  : ['./person-contact-container.component.scss']
})
export class PersonContactContainerComponent extends LayoutAbstraction.Class.Container<InformationDependenciesPersonContact.Interface.IContainerInputData> implements OnInit {
    
    coreContainer: InformationDependenciesPersonContact.Interface.IContainerCore = new InformationDependenciesPersonContact.Class.ContainerCore();
    contactValidatorList: Global.Interface.Layout.IValidation[]                  = [];
    personValidatorList: Global.Interface.Layout.IValidation[]                   = [];
    triggerSnippetContactListChange: boolean                                     = true;
    
    // region *** LibraryValidation ***
    stringValidation: LibraryValidation.Class.StringValidation = new LibraryValidation.Class.StringValidation();
    numberValidation: LibraryValidation.Class.NumberValidation = new LibraryValidation.Class.NumberValidation();
    
    // endregion
    
    constructor(private router: Router) {
        super();
        
        this.inputData = this.router.getCurrentNavigation() ? this.router.getCurrentNavigation().extras.state as LayoutCommon.Interface.IContainerInput<InformationDependenciesPersonContact.Interface.IContainerInputData> : null;
        
        if (!this.inputData) {
            this.router.navigate(['/adresar']);
            return;
        }
        
        if (this.inputData.Mode === 'edit') {
            this.coreContainer.ContainerInputData.PersonContact.copyValuesFrom(this.inputData.ContainerInputData.PersonContact);
            this.coreContainer.ContainerInputDataReference = this.inputData.ContainerInputData;
        }
    }
    
    ngOnInit(): void {
        this.coreContainer.dataFetch().then(result => {
            this.contentIsReady = true;
        });
    
    }
    
    formDataCollect(_ChangedObject: any): void {
        if (_ChangedObject instanceof INFORMATION.Class.Contact.PersonContact) {
            this.coreContainer.ContainerInputData.PersonContact = _ChangedObject;
        }
    }
    
    updateContactList(_ContactList: INFORMATION.Interface.Contact.IBasic[]): void {
        this.coreContainer.ContainerInputData.PersonContact.ContactList = _ContactList;
        
    }
    
    // region *** button logic ***
    
    onCreate(): void {
        
        this.personValidatorList = [
            {
                PropertyName    : 'Name',
                ValidationMethod: this.stringValidation.length(2, 100),
                IsValid         : false
            },
            {
                PropertyName    : 'Surname',
                ValidationMethod: this.stringValidation.length(2, 300),
                IsValid         : false
            }
        ];
        
        
        if (this.coreContainer.ContainerInputData.PersonContact.isValid(this.personValidatorList)) {
            
            this.coreContainer.ContainerInputData.PersonContact.create().then(resp => {
    
                this.router.navigate([this.inputData.ContainerInputData.RedirectTo]);
                
            });
            
            
        } else {
            this.formIsNotValidAlert();
            
        }
    }
    
    onEdit(): void {
        
        this.personValidatorList = [
            {
                PropertyName    : 'Name',
                ValidationMethod: this.stringValidation.length(2, 100),
                IsValid         : false
            },
            {
                PropertyName    : 'Surname',
                ValidationMethod: this.stringValidation.length(2, 300),
                IsValid         : false
            }
        ];
    
    
        if (this.coreContainer.ContainerInputData.PersonContact.isValid(this.personValidatorList)) {
        
            this.coreContainer.ContainerInputDataReference.PersonContact.copyValuesFrom(this.coreContainer.ContainerInputData.PersonContact);
        
            const promises = [];
        
            this.coreContainer.ContainerInputDataReference.PersonContact.ContactList.forEach(contact => {
            
                contact.PersonID = this.coreContainer.ContainerInputDataReference.PersonContact.ID;
                if (contact.ID) {
                    promises.push(contact.update());
                } else {
                    promises.push(contact.create());
                }
            });
        
            promises.push(this.coreContainer.ContainerInputDataReference.PersonContact.update());
        
            Promise.all(promises).then((response) => {
            
                this.router.navigate([this.inputData.ContainerInputData.RedirectTo]);
            });
        
        } else {
            this.formIsNotValidAlert();
            
        }
    }
    
    // endregion
    
    
    onModifyCreateContact(_Type: 'edit' | 'create', _Item?: INFORMATION.Interface.Contact.IBasic): void {
        
        const containerInput = new LayoutCommon.Class.ContainerInput<InformationDependenciesContact.Interface.IContainerInputData>(
            _Type, new InformationDependenciesContact.Class.ContainerInputData()
        );
        
        if (_Item) {
            containerInput.ContainerInputData.Contact = _Item;
        }
        
        if (_Type === 'create') {
            containerInput.ContainerInputData.Contact.PersonID = this.coreContainer.ContainerInputData.PersonContact.ID;
        }
        
        
        const subscription = this.coreContainer.modifyCreateContact(containerInput, _Type, _Item).subscribe((_Data: Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>) => {
            
            if (!_Data.Response.Data || !_Data.Response.Success) {
                subscription.unsubscribe();
                return;
            }
            
            if (_Data.Response.Action === 'create') {
                
                this.coreContainer.ContainerInputData.PersonContact.ContactList.push(_Data.Response.Data.Payload);
                this.triggerSnippetContactListChange = !this.triggerSnippetContactListChange;
            } else if (_Data.Response.Action === 'edit') {
                this.triggerSnippetContactListChange = !this.triggerSnippetContactListChange;
            }
            
            
            subscription.unsubscribe();
        });
    }
}
