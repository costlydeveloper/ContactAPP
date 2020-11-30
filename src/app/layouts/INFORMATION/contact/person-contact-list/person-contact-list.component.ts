import {Component, OnInit} from '@angular/core';
import {InformationDependenciesPersonContact} from '../../../../modules/INFORMATION/dependencies/contact-person';
import {SelectItem} from 'primeng/api';
import {INFORMATION} from '../../../../modules/INFORMATION/models';

@Component({
    selector   : 'app-contact-list',
    templateUrl: './person-contact-list.component.html',
    styleUrls  : ['./person-contact-list.component.scss']
})
export class PersonContactListComponent implements OnInit {
    
    public rowNumber: SelectItem[];
    row: number = 15;
    
    PersonContactList: INFORMATION.Interface.Contact.IPersonContact[] = [];
    
    
    coreList: InformationDependenciesPersonContact.Interface.IListCore = new InformationDependenciesPersonContact.Class.ListCore();
    
    constructor() {
        this.rowNumber = [
            {label: '15', value: 15},
            {label: '30', value: 30},
            {label: '45', value: 45}
        ];
    }
    
    ngOnInit(): void {
        
        this.coreList.dataFetch().then((resp) => {
            
            this.PersonContactList = [...this.coreList.PersonContactList];
            
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
