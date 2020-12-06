import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonContactContainerComponent} from '../../layouts/INFORMATION/contact/person-contact-container/person-contact-container.component';
import {PersonContactDetailsComponent} from '../../layouts/INFORMATION/contact/person-contact-details/person-contact-details.component';

const routes: Routes = [
    {
        path     : '',
        component: PersonContactContainerComponent,
    },
    {
        path     : 'detalji/:id',
        component: PersonContactDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactContainerRoutingModule {
}
