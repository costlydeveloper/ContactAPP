import {Component, OnInit} from '@angular/core';

@Component({
    selector   : 'app-header',
    templateUrl: './header.component.html',
    styleUrls  : ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    
    constructor() {
    }
    
    ngOnInit(): void {
    
    }
    
    clickMenu(): void {
        const element = document.getElementById('topnav');
        if (element.className === 'topnav') {
            element.className += ' responsive';
        } else {
            element.className = 'topnav';
        }
    }
    
}
