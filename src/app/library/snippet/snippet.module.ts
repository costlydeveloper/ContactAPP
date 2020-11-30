import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertBlockSnippetComponent} from './alert-block/alert-block.snippet';


@NgModule({
    declarations: [AlertBlockSnippetComponent],
    exports     : [
        AlertBlockSnippetComponent
    ],
    imports     : [
        CommonModule
    ]
})
export class SnippetModule {
}
