import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {INFORMATION} from '../../../../modules/INFORMATION/models';
import ContactCategoryList from '../../../../../assets/json/contact-category-list.json';
import {InformationDependenciesPersonContact} from '../../../../modules/INFORMATION/dependencies/contact-person';
import {LoggedUserPermissionsService} from '../../../../library/secure-data/logged-user-permissions.service';
import {DialogClass} from '../../../../library/dialog-system/dialog-definition/dialog-class';
import {DialogEnum} from '../../../../library/dialog-system/dialog-definition/dialog-enum';
import {LayoutCommon} from '../../../../dependencies/layout';

@Component({
    selector   : 'app-person-contact-details',
    templateUrl: './person-contact-details.component.html',
    styleUrls  : ['./person-contact-details.component.scss']
})
export class PersonContactDetailsComponent implements OnInit {
    personContact: INFORMATION.Interface.Contact.IPersonContact = new INFORMATION.Class.Contact.PersonContact();
    contentIsReady: boolean                                     = false;
    groupedContacts: any;
    
    constructor(private router: Router, private activatedRoute: ActivatedRoute, public loggedUserPermissionService: LoggedUserPermissionsService) {
        
        this.activatedRoute.params.subscribe((params: Params) => {
            this.contentIsReady = false;
            this.personContact.personContactRead(params['id']).then(resp => {
                
                this.groupedContacts = this.personContact.ContactList.reduce((acc, curr) => {
                    const contactCategoryTitle = ContactCategoryList.find(item => item.ID === curr.ContactCategoryID);
                    if (!acc[contactCategoryTitle.Title]) {
                        acc[contactCategoryTitle.Title] = [];
                    }
                    acc[contactCategoryTitle.Title].push(curr);
                    return acc;
                }, {});
                this.contentIsReady  = true;
            });
            
        });
        
    }
    
    remove(_Item: INFORMATION.Interface.Contact.IPersonContact): void {
        
        if (_Item.ID === this.loggedUserPermissionService.getLoggedUser().Person.ID) {
            const notificationPopups: DialogClass.Popups = new DialogClass.Popups();
            notificationPopups.onToast({
                Title      : 'Error',
                Description: 'You can\'t delete yourself.',
                Color      : DialogEnum.DialogColorTypes.WARNING,
            });
            return;
        }
        
        const confirmation = new DialogClass.ConfirmBox(`Delete person?`, `Delete ${_Item.Surname} ${_Item.Name} `, {
            ColorType : DialogEnum.DialogColorTypes.DANGER,
            ConfirmBox: true
        });
        
        const subscription = confirmation.Dialog.response.subscribe((_Response: DialogClass.ConfirmBoxResponse) => {
            if (_Response.Response.Action) {
                this.router.navigate(['/adresar']);
            }
            subscription.unsubscribe();
        });
        
    }
    
    modify(_Item?: INFORMATION.Interface.Contact.IPersonContact): void {
        
        const containerInput = new LayoutCommon.Class.ContainerInput<InformationDependenciesPersonContact.Interface.IContainerInputData>(
            'edit', new InformationDependenciesPersonContact.Class.ContainerInputData()
        );
        
        if (_Item) {
            containerInput.ContainerInputData.PersonContact = _Item;
        }
        containerInput.ContainerInputData.RedirectTo = this.router.url;
        this.router.navigate(['/kontakt'], {state: containerInput});
        
    }
    
    
    ngOnInit(): void {
    
    }
    
}
