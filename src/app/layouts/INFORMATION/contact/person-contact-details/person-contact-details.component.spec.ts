import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonContactDetailsComponent} from './person-contact-details.component';

describe('PersonContactDetailsComponent', () => {
    let component: PersonContactDetailsComponent;
    let fixture: ComponentFixture<PersonContactDetailsComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonContactDetailsComponent]
        })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture   = TestBed.createComponent(PersonContactDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
