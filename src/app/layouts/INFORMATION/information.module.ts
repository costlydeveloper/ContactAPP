import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoriteExistPipe, PersonContactListComponent} from './contact/person-contact-list/person-contact-list.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PersonContactContainerComponent} from './contact/person-contact-container/person-contact-container.component';
import {ContactFormComponent} from './contact/contact-form/contact-form.component';
import {FormsModule} from '@angular/forms';
import {BaseModule} from '../BASE/base.module';
import {ContactContainerComponent} from './contact/contact-container/contact-container.component';
import {DropdownModule} from 'primeng/dropdown';
import {SnippetContactListComponent} from './contact/snippet-contact-list/snippet-contact-list.component';
import {RippleModule} from 'primeng/ripple';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {PersonContactDetailsComponent} from './contact/person-contact-details/person-contact-details.component';
import {RouterModule} from '@angular/router';
import {FavoriteContactListComponent} from './contact/favorite-contact-list/favorite-contact-list.component';
import {PopupDialogModule} from '../../library/dialog-system/dialog-definition/dialog.module';
import {SnippetModule} from '../../library/snippet/snippet.module';
import {PipeModule} from '../../library/pipe/pipe.module';


@NgModule({
    declarations: [PersonContactListComponent, PersonContactContainerComponent, ContactFormComponent, ContactContainerComponent, SnippetContactListComponent, PersonContactDetailsComponent, FavoriteExistPipe, FavoriteContactListComponent],
    imports     : [
        CommonModule,
        TableModule,
        ButtonModule,
        RippleModule,
        FormsModule,
        BaseModule,
        InputTextModule,
        DropdownModule,
        TooltipModule,
        RouterModule,
        PopupDialogModule,
        SnippetModule,
        PipeModule
    ]
})
export class InformationModule {
}
