import {AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {LayoutAbstraction} from '../../../../dependencies/layout';
import {BASE} from '../../../../modules/BASE/models';

@Component({
    selector   : 'app-person-form',
    templateUrl: './person-form.component.html',
    styleUrls  : ['./person-form.component.scss']
})
export class PersonFormComponent extends LayoutAbstraction.Class.FormCommonTemplateDriven<BASE.Interface.Person.IBasic> implements OnDestroy, OnChanges, AfterViewInit {
    
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
    
    ngAfterViewInit(): void {
        // deklarirano u naslijeđenoj klasi
        this.theChangeListener();
    }
    
    prepareCreateValues(_FormValues: any): void {
    }
    
    formSet(): void {
    }
}
