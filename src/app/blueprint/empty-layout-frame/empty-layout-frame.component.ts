import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector   : 'app-empty-layout-frame',
    templateUrl: 'empty-layout-frame.component.html',
    styleUrls  : ['empty-layout-frame.component.scss'],
    animations : [
        trigger('content', [
            state('inactive', style({visibility: 'hidden', opacity: 0})),
            state('active', style({visibility: 'visible', opacity: 1})),
            transition('inactive => active', animate('.2s 100ms ease-in')),
            transition('active => inactive', animate('.0s 0ms ease-in'))
        ]),
        trigger('loader', [
            state('inactive', style({visibility: 'hidden', opacity: 0})),
            state('active', style({visibility: 'visible', opacity: 1})),
            transition('inactive => active', animate('.2s 100ms ease-in')),
            transition('active => inactive', animate('.0s 0ms ease-in'))
        ])
    ],
})
export class EmptyLayoutFrameComponent {
    
    // contentState: string = 'inactive';
    contentState: string = 'active';
    
    constructor(private router: Router) {
    }
    
    public getRouterOutletState(outlet: RouterOutlet): any {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
    
}
