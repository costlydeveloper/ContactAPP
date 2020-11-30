import {AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {LayoutAbstraction} from '../../../../dependencies/layout';
import {SECURITY} from '../../../../modules/SECURITY/models';

@Component({
    selector   : 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls  : ['./login-form.component.scss']
})
export class LoginFormComponent extends LayoutAbstraction.Class.FormCommonTemplateDriven<SECURITY.Interface.Handshake.ICredentials> implements OnDestroy, OnChanges, AfterViewInit {
    
    
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
        //  this.singleObjectInput.GenderCategoryID = _FormValues.Gender.ID;
    }
    
    formSet(): void {
        // this.Gender = this.GenderList.find((item: ELEMENTARY.Interface.Gender.IBasic) => item.ID === this.singleObjectInput.GenderCategoryID);
    }
}
