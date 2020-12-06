import {Component} from '@angular/core';
import {DialogService} from './library/dialog-system/dialog-definition/dialog.service';
import {ToastService} from './library/dialog-system/dialog-definition/toast.service';
import {RouterOutlet} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {fadeAnimation} from './library/animation/fade-in-out.animation';


@Component({
    selector   : 'app-root',
    templateUrl: 'app.component.html',
    styleUrls  : ['./app.component.scss'],
    animations : [fadeAnimation]
})

export class AppComponent {
    constructor(public dialog: DialogService,
                public toastService: ToastService,
                private primengConfig: PrimeNGConfig) {
        this.primengConfig.ripple = true;
    }
    
    
    public getRouterOutletState(outlet: RouterOutlet): any {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
    
    public onRouterOutletActivate(event: any): void {
    }
    
    
}
