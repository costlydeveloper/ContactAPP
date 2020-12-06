import {animate, query, state, style, transition, trigger} from '@angular/animations';

export const fadeInOut = (_OpacityMin = 0, _OpacityMax = 1) => {
    
    return trigger('fadeInOut', [
        // ...
        state('open', style({
            opacity: _OpacityMax
        })),
        state('closed', style({
            opacity: _OpacityMin
        })),
        transition('* => close-animate-fast', [
            animate('0.1s')
        ]),
        transition('* => open', [
            animate('0.2s')
        ]),
        transition('* => close-animate-slow', [
            animate('1.3s')
        ]),
        transition('* => close-without-animate', [
            animate('0s')
        ])
    ]);
};

export const inOutAnimation = (_OpacityMin = 0, _OpacityMax = 1) => {
    return trigger(
        'inOutAnimation',
        [
            transition(
                ':enter',
                [
                    style({opacity: _OpacityMin}),
                    animate('.8s ease-out',
                        style({opacity: _OpacityMax}))
                ]
            ),
            transition(
                ':leave',
                [
                    style({opacity: _OpacityMax}),
                    animate('.5s ease-in',
                        style({opacity: _OpacityMin}))
                ]
            )
        ]
    );
};

export const additionalDivExpand =
                 trigger('additionalDiv', [
                     state('false', style({
                         overflow: 'hidden',
                         height  : 0
                     })),
                     state('true', style({
                         height  : '*',
                         overflow: 'hidden'
                     })),
                     transition('false => true', animate('.5s 0ms cubic-bezier(0.895, 0.03, 0.685, 0.22)')),
                     transition('true => false', animate('.5s 0ms cubic-bezier(0.165, 0.84, 0.44, 1)'))
                 ]);


export const fadeAnimation =
    
                 trigger('fadeAnimation', [
        
                     transition('* => *', [
            
                         query(':enter',
                             [
                                 style({opacity: 0})
                             ],
                             {optional: true}
                         ),
            
                         query(':leave',
                             [
                                 style({opacity: 1}),
                                 animate('0.8s', style({opacity: 0}))
                             ],
                             {optional: true}
                         ),
            
                         query(':enter',
                             [
                                 style({opacity: 0}),
                                 animate('0.8s', style({opacity: 1}))
                             ],
                             {optional: true}
                         )
        
                     ])
    
                 ]);
