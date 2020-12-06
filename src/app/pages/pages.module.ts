import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppLayoutFrameComponent} from '../blueprint/app-layout-frame/app-layout-frame.component';
import {EmptyLayoutFrameComponent} from '../blueprint/empty-layout-frame/empty-layout-frame.component';
import {SecurityModule} from '../layouts/SECURITY/security.module';
import {FormsModule} from '@angular/forms';
import {InformationModule} from '../layouts/INFORMATION/information.module';
import {HeaderComponent} from '../blueprint/header/header.component';
import {CommonModule} from '@angular/common';
import {PipeModule} from '../library/pipe/pipe.module';

@NgModule({
    declarations: [
        AppLayoutFrameComponent,
        EmptyLayoutFrameComponent,
        HeaderComponent
    ],
    imports     : [
        RouterModule,
        SecurityModule,
        FormsModule,
        InformationModule,
        CommonModule,
        PipeModule
    ]
})
export class PagesModule {
}
