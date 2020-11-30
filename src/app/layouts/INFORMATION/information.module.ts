import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonContactListComponent} from './contact/person-contact-list/person-contact-list.component';
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


@NgModule({
    declarations: [PersonContactListComponent, PersonContactContainerComponent, ContactFormComponent, ContactContainerComponent, SnippetContactListComponent],
    imports     : [
        CommonModule,
        TableModule,
        ButtonModule,
        RippleModule,
        FormsModule,
        BaseModule,
        InputTextModule,
        DropdownModule,
        TooltipModule
    ]
})
export class InformationModule {
}
