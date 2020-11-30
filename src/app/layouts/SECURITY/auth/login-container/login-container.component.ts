import {Component, OnInit} from '@angular/core';
import {LayoutAbstraction} from '../../../../dependencies/layout';
import {AuthDependencies} from '../../../../modules/SECURITY/dependencies/auth';
import {Global} from '../../../../dependencies/global';
import {SECURITY} from '../../../../modules/SECURITY/models';
import {LibraryValidation} from '../../../../library/validation/vaidation';
import {LoggedUserPermissionsService} from '../../../../library/secure-data/logged-user-permissions.service';

@Component({
    selector   : 'app-login-container',
    templateUrl: './login-container.component.html',
    styleUrls  : ['./login-container.component.scss']
})
export class LoginContainerComponent extends LayoutAbstraction.Class.Container<any> implements OnInit {
    
    // region *** validation ***
    credentialsValidatorList: Global.Interface.Layout.IValidation[] = [];
    // endregion
    
    // region *** LibraryValidation ***
    stringValidation: LibraryValidation.Class.StringValidation = new LibraryValidation.Class.StringValidation();
    numberValidation: LibraryValidation.Class.NumberValidation = new LibraryValidation.Class.NumberValidation();
    // endregion
    
    public coreContainer: AuthDependencies.Interface.IContainerCore = new AuthDependencies.Class.ContainerCore();
    
    constructor(private loggedUserPermissionService: LoggedUserPermissionsService) {
        super();
    }
    
    ngOnInit(): void {
        localStorage.clear();
        this.coreContainer.dataFetch().then(resp => {
            this.contentIsReady = true;
        });
        
    }
    
    formDataCollect(_ChangedObject: any): void {
        if (_ChangedObject instanceof SECURITY.Class.Handshake.Credentials) {
            this.coreContainer.ContainerInputData.Credentials = _ChangedObject;
        }
    }
    
    // region *** button logic ***
    
    onSubmit(): void {
        
        this.credentialsValidatorList = [
            {
                PropertyName    : 'Username',
                ValidationMethod: this.stringValidation.email(),
                IsValid         : false
            },
            {
                PropertyName    : 'Password',
                ValidationMethod: this.stringValidation.password(),
                IsValid         : false
            }
        ];
        
        if (this.coreContainer.ContainerInputData.Credentials.isValid(this.credentialsValidatorList)) {
            
            this.coreContainer.ContainerInputData.Credentials.handshake().then(loggedUser => {
                
                this.loggedUserPermissionService.setLoggedUser(loggedUser);
                
            }).catch(error => {
                return new Error('ERR');
            });
            
        } else {
            this.coreContainer.ContainerInputData.Credentials.Password = null;
            this.coreContainer.ContainerInputData.Credentials.Username = null;
            
            this.formIsNotValidAlert();
            
        }
    }
    
    // endregion
}
