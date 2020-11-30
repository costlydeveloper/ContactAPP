import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {LayoutAbstraction} from '../../../../dependencies/layout';
import {INFORMATION} from '../../../../modules/INFORMATION/models';

@Component({
    selector   : 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls  : ['./contact-form.component.scss']
})
export class ContactFormComponent extends LayoutAbstraction.Class.FormCommonTemplateDriven<INFORMATION.Interface.Contact.IBasic> implements OnDestroy, OnChanges, OnInit, AfterViewInit {
    
    @Input() contactCategoryList: INFORMATION.Interface.Contact.ICategory[];
    contactCategory: INFORMATION.Interface.Contact.ICategory;
    
    constructor() {
        super();
    }
    
    ngOnChanges(_SimpleChange: SimpleChanges): void {
        this.formSet();
        this.validationAlgorithm();
    }
    
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    
    ngOnInit(): void {
        this.contactCategory = this.contactCategoryList.find((item) => item.ID === this.formObjectInput.ContactCategoryID);
    }
    
    ngAfterViewInit(): void {
        this.theChangeListener();
    }
    
}
