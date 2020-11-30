import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonContactContainerComponent} from '../../layouts/INFORMATION/contact/person-contact-container/person-contact-container.component';

const routes: Routes = [{
    path     : '',
    component: PersonContactContainerComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactContainerRoutingModule {
}
