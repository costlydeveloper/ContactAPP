import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarLetterPipe} from './avatar-letter.pipe';


@NgModule({
    declarations: [AvatarLetterPipe],
    exports     : [
        AvatarLetterPipe
    ],
    imports     : [
        CommonModule
    ]
})
export class PipeModule {
}
