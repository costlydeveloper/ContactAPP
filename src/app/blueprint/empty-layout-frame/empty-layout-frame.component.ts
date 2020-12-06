import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {content} from '../../library/animation/loder.animations';

@Component({
    selector   : 'app-empty-layout-frame',
    templateUrl: 'empty-layout-frame.component.html',
    styleUrls  : ['empty-layout-frame.component.scss'],
    animations : [content],
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
