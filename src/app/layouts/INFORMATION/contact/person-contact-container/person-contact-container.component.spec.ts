import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonContactContainerComponent} from './person-contact-container.component';

describe('ContactContainerComponent', () => {
    let component: PersonContactContainerComponent;
    let fixture: ComponentFixture<PersonContactContainerComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonContactContainerComponent]
        })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture   = TestBed.createComponent(PersonContactContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
