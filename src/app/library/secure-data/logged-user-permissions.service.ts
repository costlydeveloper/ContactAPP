import {Injectable} from '@angular/core';
import {SECURITY} from '../../modules/SECURITY/models';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class LoggedUserPermissionsService {
    
    private loggedUser: SECURITY.Interface.Handshake.ILoggedUser = null;
    
    constructor(private firestore: AngularFirestore, private router: Router) {
        if (this.router.url.includes('auth')) {
            this.loggedUser = null;
            localStorage.clear();
        } else {
            if (!this.loggedUser) {
                this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
            }
        }
    }
    
    async haveAccess(): Promise<boolean> {
        let securityLogoutCount = 0;
        
        while (this.loggedUser === null) {
            
            securityLogoutCount++;
            if (securityLogoutCount > 30) {
                // LOGOUT id data is missing
                this.logout();
                return false;
            } else {
                await this.__delay__(500);
            }
        }
        return true;
    }
    
    public logout(): void {
        this.router.navigate(['/']);
        localStorage.clear();
    }
    
    public setLoggedUser(_LoggedUser: SECURITY.Interface.Handshake.ILoggedUser): void {
        this.loggedUser = _LoggedUser;
        localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
        this.router.navigate(['/adresar']);
    }
    
    public getLoggedUser(): SECURITY.Interface.Handshake.ILoggedUser {
        return this.loggedUser;
    }
    
    private __delay__(timer: number = 2000): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => resolve(), timer);
        });
    }
}
