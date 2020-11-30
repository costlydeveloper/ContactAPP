import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppLayoutFrameComponent} from './app-layout-frame.component';

describe('AppLayoutFrameComponent', () => {
    let component: AppLayoutFrameComponent;
    let fixture: ComponentFixture<AppLayoutFrameComponent>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppLayoutFrameComponent]
        })
            .compileComponents();
    });
    
    beforeEach(() => {
        fixture   = TestBed.createComponent(AppLayoutFrameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
