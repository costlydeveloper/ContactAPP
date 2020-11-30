import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SnippetContactListComponent} from './snippet-contact-list.component';

describe('SnippetContactListComponent', () => {
    let component: SnippetContactListComponent;
    let fixture: ComponentFixture<SnippetContactListComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SnippetContactListComponent]
        })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture   = TestBed.createComponent(SnippetContactListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
