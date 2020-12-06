import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteContactListComponent} from './favorite-contact-list.component';

describe('FavoriteContactListComponent', () => {
    let component: FavoriteContactListComponent;
    let fixture: ComponentFixture<FavoriteContactListComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FavoriteContactListComponent]
        })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture   = TestBed.createComponent(FavoriteContactListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
