import {animate, state, style, transition, trigger} from '@angular/animations';

export const loader = trigger('loader', [
    state('inactive', style({
        opacity: 0,
        zIndex : -1
    })),
    state('active', style({
        opacity: 1,
        zIndex : 1
    })),
    transition('inactive => active', animate('.5s 0ms ease-in')),
    transition('active => inactive', animate('.3s 0ms ease-out'))
]);

export const content = trigger('content', [
    state('inactive', style({
        visibility: 'hidden',
        opacity   : 0
    })),
    state('active', style({
        visibility: 'visible',
        opacity   : 1
    })),
    transition('inactive => active', animate('.2s 100ms ease-in')),
    transition('active => inactive', animate('.0s 0ms ease-in'))
]);
