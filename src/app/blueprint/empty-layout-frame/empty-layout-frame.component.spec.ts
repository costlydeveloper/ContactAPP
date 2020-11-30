import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmptyLayoutFrameComponent} from './empty-layout-frame.component';

describe('EmptyLayoutFrameComponent', () => {
    let component: EmptyLayoutFrameComponent;
    let fixture: ComponentFixture<EmptyLayoutFrameComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmptyLayoutFrameComponent]
        })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture   = TestBed.createComponent(EmptyLayoutFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
