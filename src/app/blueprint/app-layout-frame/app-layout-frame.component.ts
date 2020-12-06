import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {content} from '../../library/animation/loder.animations';

@Component({
    selector   : 'app-app-layout-frame',
    templateUrl: './app-layout-frame.component.html',
    styleUrls  : ['./app-layout-frame.component.scss'],
    animations : [content]
})
export class AppLayoutFrameComponent {
    
    contentState: string = 'active';
    
    constructor(private router: Router) {
    }
    
    public getRouterOutletState(outlet: RouterOutlet): any {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
    
}
