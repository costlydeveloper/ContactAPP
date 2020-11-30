import {Component, Input, OnInit} from '@angular/core';
import {LibrarySnippet} from '../snippets';

@Component({
    selector   : 'app-alert-block',
    templateUrl: './alert-block.snippet.html',
    styleUrls  : ['./alert-block.snippet.scss']
})
export class AlertBlockSnippetComponent implements OnInit {
    
    @Input() content: string                      = null;
    @Input() type: LibrarySnippet.Enum.ColorTypes = null;
    @Input() showIcon: boolean                    = false;
    @Input() customIcon: string                   = null;
    
    constructor() {
    }
    
    ngOnInit(): void {
    }
    
}
