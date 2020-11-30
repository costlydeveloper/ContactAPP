import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonFormComponent} from './person/person-form/person-form.component';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
    declarations: [PersonFormComponent],
    exports     : [
        PersonFormComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        CalendarModule
    ]
})
export class BaseModule {
}
