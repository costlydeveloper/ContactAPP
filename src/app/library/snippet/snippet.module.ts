import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertBlockSnippetComponent} from './alert-block/alert-block.snippet';
import {PageLoaderComponent} from './page-loader/page-loader.component';


@NgModule({
    declarations: [AlertBlockSnippetComponent, PageLoaderComponent],
    exports     : [
        AlertBlockSnippetComponent,
        PageLoaderComponent
    ],
    imports     : [
        CommonModule
    ]
})
export class SnippetModule {
}
