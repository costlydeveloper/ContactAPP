import {Routes} from '@angular/router';
import {EmptyLayoutFrameComponent} from '../blueprint/empty-layout-frame/empty-layout-frame.component';
import {AppLayoutFrameComponent} from '../blueprint/app-layout-frame/app-layout-frame.component';
import {AppGuard} from '../library/secure-data/app-guard.guard';

export const PAGE_ROUTES: Routes = [
    {
        path      : '',
        redirectTo: 'auth',
        pathMatch : 'full'
    },
    {
        path     : '',
        component: EmptyLayoutFrameComponent,
        children : [
            {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)}
        ]
    },
    {
        path     : '',
        component: AppLayoutFrameComponent,
        children : [
            {
                path        : 'adresar',
                loadChildren: () => import('./contact-list/contact-list.module').then(mod => mod.ContactListModule),
                canActivate : [AppGuard],
                data        : {PageID: 1}
            }, {
                path        : 'kontakt',
                loadChildren: () => import('./contact-container/contact-container.module').then(mod => mod.ContactContainerModule),
                canActivate : [AppGuard],
                data        : {PageID: 2}
            }
        ]
    }
];
