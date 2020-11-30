import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppLayoutFrameComponent} from '../blueprint/app-layout-frame/app-layout-frame.component';
import {EmptyLayoutFrameComponent} from '../blueprint/empty-layout-frame/empty-layout-frame.component';
import {SecurityModule} from '../layouts/SECURITY/security.module';
import {FormsModule} from '@angular/forms';
import {InformationModule} from '../layouts/INFORMATION/information.module';


@NgModule({
    declarations: [
        AppLayoutFrameComponent,
        EmptyLayoutFrameComponent
    ],
    imports     : [
        RouterModule,
        SecurityModule,
        FormsModule,
        InformationModule
    ]
})
export class PagesModule {
}
