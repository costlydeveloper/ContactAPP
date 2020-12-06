import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonContactListComponent} from '../../layouts/INFORMATION/contact/person-contact-list/person-contact-list.component';
import {FavoriteContactListComponent} from '../../layouts/INFORMATION/contact/favorite-contact-list/favorite-contact-list.component';

const routes: Routes = [
    {
        path     : '',
        component: PersonContactListComponent
    },
    {
        path     : 'omiljeni',
        component: FavoriteContactListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactListRoutingModule {
}
