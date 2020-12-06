import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {InformationDependenciesPersonContact} from '../../../../modules/INFORMATION/dependencies/contact-person';
import {SelectItem} from 'primeng/api';
import {INFORMATION} from '../../../../modules/INFORMATION/models';
import {LoggedUserPermissionsService} from '../../../../library/secure-data/logged-user-permissions.service';
import {loader} from '../../../../library/animation/loder.animations';

@Component({
    selector   : 'app-contact-list',
    templateUrl: './person-contact-list.component.html',
    styleUrls  : ['./person-contact-list.component.scss'],
    animations : [loader]
})
export class PersonContactListComponent implements OnInit {
    
    public rowNumber: SelectItem[];
    row: number                                                        = 15;
    loaderViewChange: string                                           = 'active';
    favoriteButtonReady: boolean                                       = true;
    PersonContactList: INFORMATION.Interface.Contact.IPersonContact[]  = [];
    coreList: InformationDependenciesPersonContact.Interface.IListCore = new InformationDependenciesPersonContact.Class.ListCore();
    
    constructor(private loggedUserPermissionService: LoggedUserPermissionsService) {
        this.rowNumber = [
            {label: '15', value: 15},
            {label: '30', value: 30},
            {label: '45', value: 45}
        ];
    }
    
    ngOnInit(): void {
    
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
    
    favorite(_PersonContact: INFORMATION.Interface.Contact.IPersonContact): void {
        
        if (this.favoriteButtonReady) {
            this.favoriteButtonReady = false;
            
            const favoriteIndex = this.coreList.FavoriteRelationList.findIndex(item => item.PersonID === _PersonContact.ID);
            
            if (favoriteIndex > -1) {
                this.coreList.FavoriteRelationList[favoriteIndex].remove().then(resp => {
                    this.coreList.FavoriteRelationList.splice(favoriteIndex, 1);
                    this.favoriteButtonReady = true;
                });
            } else {
                const favorite    = new INFORMATION.Class.FavoriteContact.Basic();
                favorite.PersonID = _PersonContact.ID;
                favorite.UserID   = this.loggedUserPermissionService.getLoggedUser().User.ID;
                favorite.create().then(resp => {
                    this.coreList.FavoriteRelationList.push(resp);
                    this.favoriteButtonReady = true;
                });
            }
        }
        
    }
    
}

@Pipe({
    name: 'favoriteExist',
    pure: false
})
export class FavoriteExistPipe implements PipeTransform {
    
    transform(_PersonID: string, _FavoriteRelationList: INFORMATION.Interface.FavoriteContact.IBasic[]): boolean {
        return _FavoriteRelationList.some(item => item.PersonID === _PersonID);
    }
}
