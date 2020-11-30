import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginContainerComponent} from '../../layouts/SECURITY/auth/login-container/login-container.component';

const routes: Routes = [
    {
        path     : '',
        component: LoginContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}

