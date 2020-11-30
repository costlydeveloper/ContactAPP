import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginContainerComponent} from './auth/login-container/login-container.component';
import {LoginFormComponent} from './auth/login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import {SnippetModule} from '../../library/snippet/snippet.module';


@NgModule({
    declarations: [LoginContainerComponent, LoginFormComponent],
    imports     : [
        CommonModule,
        FormsModule,
        SnippetModule
    ]
})
export class SecurityModule {
}
