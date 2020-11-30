import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appDialogLoader]'
})
export class DialogLoaderDirective {
    
    constructor(public viewContainerRef: ViewContainerRef) {
    }
    
}
