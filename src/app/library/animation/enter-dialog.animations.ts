import {animate, style, transition, trigger} from '@angular/animations';

export const enterDialogAnimation =
    
                 trigger(
                     'enterDialogAnimation', [
                         transition(
                             ':enter',
                             [
                                 style({'max-height': 0, opacity: 0}),
                                 animate('0.4s ease-out',
                                     style({'max-height': 1000, opacity: 1}))
                             ]
                         )
                     ]
                 );
