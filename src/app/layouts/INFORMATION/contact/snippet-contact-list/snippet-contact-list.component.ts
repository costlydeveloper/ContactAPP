import {Component, DoCheck, EventEmitter, Input, IterableDiffer, IterableDiffers, OnChanges, Output, ViewChild} from '@angular/core';
import {INFORMATION} from 'src/app/modules/INFORMATION/models';
import {LayoutCommon} from '../../../../dependencies/layout';
import {InformationDependenciesContact} from '../../../../modules/INFORMATION/dependencies/contact';
import {Global} from '../../../../dependencies/global';
import {DialogInterface} from '../../../../library/dialog-system/dialog-definition/dialog-interface';
import {InformationDependenciesPersonContact} from '../../../../modules/INFORMATION/dependencies/contact-person';
import {Table} from 'primeng/table';
import {DialogClass} from '../../../../library/dialog-system/dialog-definition/dialog-class';
import {DialogEnum} from '../../../../library/dialog-system/dialog-definition/dialog-enum';

@Component({
    selector   : 'app-snippet-contact-list',
    templateUrl: './snippet-contact-list.component.html',
    styleUrls  : ['./snippet-contact-list.component.scss']
})
export class SnippetContactListComponent extends InformationDependenciesPersonContact.Class.ContactDialog implements OnChanges, DoCheck {
    
    @Input() contactList: INFORMATION.Interface.Contact.IBasic[]                      = [];
    @Input() triggerChange: boolean;
    @Input() isStatic: boolean;
    @ViewChild('table', {static: true}) table: Table;
    iterableDiffer: IterableDiffer<any>;
    @Output() contactListOutput: EventEmitter<INFORMATION.Interface.Contact.IBasic[]> = new EventEmitter<INFORMATION.Interface.Contact.IBasic[]>();
    
    constructor(
        private iterableDiffers: IterableDiffers,
    ) {
        super();
        this.iterableDiffer = iterableDiffers.find([]).create(null);
    }
    
    ngOnChanges(): void {
        this.sort();
    }
    
    sort(): void {
        this.contactList = this.contactList.sort((obj1, obj2) => obj1.ContactCategoryID < obj2.ContactCategoryID ? -1 : 0);
    }
    
    onModifyContact(_Item: INFORMATION.Interface.Contact.IBasic): void {
        
        const containerInput = new LayoutCommon.Class.ContainerInput<InformationDependenciesContact.Interface.IContainerInputData>(
            'edit', new InformationDependenciesContact.Class.ContainerInputData()
        );
        
        containerInput.ContainerInputData.Contact = _Item;
    
    
        const subscription = this.modifyCreateContact(containerInput, 'edit', _Item).subscribe((_Data: Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>) => {
        
            if (!_Data.Response.Data || !_Data.Response.Success) {
                subscription.unsubscribe();
                return;
            }
        
            if (_Data.Response.Action === 'edit') {
                this.sort();
                this.emitData();
            }
        
            subscription.unsubscribe();
        });
    }
    
    onRemoveContact(_Item: INFORMATION.Interface.Contact.IBasic): void {
        if (!_Item.ID) {
            this.contactList = this.contactList.filter(item => item !== _Item);
            this.emitData();
            return;
        }
        
        const confirmation = new DialogClass.ConfirmBox('Are you sure?', 'Delete', {
            ColorType : DialogEnum.DialogColorTypes.DANGER,
            ConfirmBox: true
        });
        
        const subscription = confirmation.Dialog.response.subscribe((_Response: DialogClass.ConfirmBoxResponse) => {
            if (_Response.Response.Action) {
                
                _Item.remove().then((response) => {
                    // removed
                    this.contactList = this.contactList.filter(item => item.ID !== response.ID);
                    this.emitData();
                });
            }
            subscription.unsubscribe();
        });
    }
    
    ngDoCheck(): void {
        const changes = this.iterableDiffer.diff(this.contactList);
        if (changes) {
            this.table.reset();
        }
    }
    
    emitData(): void {
        this.contactListOutput.emit(this.contactList);
    }
    
    
}

