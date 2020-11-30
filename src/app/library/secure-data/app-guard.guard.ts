import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {LoggedUserPermissionsService} from './logged-user-permissions.service';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {
    
    constructor(private loggedUserPermissionService: LoggedUserPermissionsService) {
    }
    
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            
            this.loggedUserPermissionService.haveAccess().then(resp => {
                return resolve(resp);
            });
            
        });
        
    }
    
}
