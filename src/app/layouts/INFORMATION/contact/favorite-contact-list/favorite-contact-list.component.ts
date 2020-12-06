import {Component} from '@angular/core';
import {InformationDependenciesFavoriteContact} from '../../../../modules/INFORMATION/dependencies/favorite-contact';
import {LoggedUserPermissionsService} from '../../../../library/secure-data/logged-user-permissions.service';
import {SelectItem} from 'primeng/api';
import {INFORMATION} from '../../../../modules/INFORMATION/models';
import {loader} from '../../../../library/animation/loder.animations';

@Component({
    selector   : 'app-favorite-contact-list',
    templateUrl: './favorite-contact-list.component.html',
    styleUrls  : ['./favorite-contact-list.component.scss'],
    animations : [loader]
})
export class FavoriteContactListComponent {
    
    public rowNumber: SelectItem[];
    PersonContactList: INFORMATION.Interface.Contact.IPersonContact[]    = [];
    row: number                                                          = 10;
    loaderViewChange: string                                             = 'active';
    coreList: InformationDependenciesFavoriteContact.Interface.IListCore = new InformationDependenciesFavoriteContact.Class.ListCore();
    
    constructor(private loggedUserPermissionService: LoggedUserPermissionsService) {
        
        this.coreList.dataFetch(this.loggedUserPermissionService.getLoggedUser().User.ID).then((resp) => {
            this.PersonContactList = [...this.coreList.PersonContactList];
            this.loaderViewChange  = 'inactive';
        });
        
    }
    
    myFilter(_SearchText: string): void {
        
        if (_SearchText) {
            _SearchText            = _SearchText.toLowerCase();
            this.PersonContactList = this.coreList.PersonContactList.filter(person => {
                const email = person.ContactList.filter(contact => contact.ContactCategoryID === INFORMATION.Enum.Contact.Category.EMAIL)
                    .map(contact => (contact.Title.toLowerCase())).join(',');
                return (person.Name.toLowerCase() + person.Surname.toLowerCase()).includes(_SearchText) || (email.includes(_SearchText));
            });
        }
        
    }
    
}
