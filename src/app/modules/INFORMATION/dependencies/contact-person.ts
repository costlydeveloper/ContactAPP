import {INFORMATION} from '../models';
import {LayoutCommon} from '../../../dependencies/layout';
import {ServiceLocator} from '../../../library/data-operation/locator.service';
import {Router} from '@angular/router';
import {DialogClass} from '../../../library/dialog-system/dialog-definition/dialog-class';
import {DialogEnum} from '../../../library/dialog-system/dialog-definition/dialog-enum';
import {LoggedUserPermissionsService} from '../../../library/secure-data/logged-user-permissions.service';
import {ContactContainerComponent} from '../../../layouts/INFORMATION/contact/contact-container/contact-container.component';
import {Global} from '../../../dependencies/global';
import {DialogInterface} from '../../../library/dialog-system/dialog-definition/dialog-interface';
import {Observable} from 'rxjs';

export namespace InformationDependenciesPersonContact {
    
    export namespace Interface {
        
        export interface IListCore {
            PersonContactList: INFORMATION.Interface.Contact.IPersonContact[];
            FavoriteRelationList: INFORMATION.Interface.FavoriteContact.IBasic[];
    
    
            remove(_Item: INFORMATION.Interface.Contact.IPersonContact): void;
    
            modifyCreate(_Type: 'edit' | 'create', _Item?: INFORMATION.Interface.Contact.IPersonContact): void;
    
            dataFetch(_UserID: string): Promise<this>;
    
        } // class ContactListCore
        
        export interface IContactDialog {
            
            modifyCreateContact<T>(_ContainerInput: T, _Type: 'edit' | 'create', _Item?: INFORMATION.Interface.Contact.IBasic): Observable<Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>>;
            
        } // class IContactDialog
        
        export interface IContainerCore extends InformationDependenciesPersonContact.Interface.IContactDialog {
            ContainerInputData: InformationDependenciesPersonContact.Interface.IContainerInputData;
            ContainerInputDataReference: InformationDependenciesPersonContact.Interface.IContainerInputData;
            
            dataFetch(): Promise<any>;
            
        } // class ContactListCore
        
        export interface IContainerInputData {
            PersonContact: INFORMATION.Interface.Contact.IPersonContact;
            RedirectTo: string;
        } // interface IContainerInputData
        
        
    } // namespace Interface
    
    export namespace Class {
    
        export class ListCore implements InformationDependenciesPersonContact.Interface.IListCore {
        
            PersonContactList: INFORMATION.Interface.Contact.IPersonContact[]    = [];
            FavoriteRelationList: INFORMATION.Interface.FavoriteContact.IBasic[] = [];
        
            remove(_Item: INFORMATION.Interface.Contact.IPersonContact): void {
            
                const loggedUserPermissionService: LoggedUserPermissionsService = ServiceLocator.injector.get(LoggedUserPermissionsService);
            
                if (_Item.ID === loggedUserPermissionService.getLoggedUser().Person.ID) {
                    const notificationPopups: DialogClass.Popups = new DialogClass.Popups();
                    notificationPopups.onToast({
                        Title      : 'Error',
                        Description: 'You can\'t delete yourself.',
                        Color      : DialogEnum.DialogColorTypes.WARNING,
                    });
                    return;
                }
                
                const confirmation = new DialogClass.ConfirmBox(`Delete person?`, `Delete ${_Item.Surname} ${_Item.Name} `, {
                    ColorType : DialogEnum.DialogColorTypes.DANGER,
                    ConfirmBox: true
                });
                
                const subscription = confirmation.Dialog.response.subscribe((_Response: DialogClass.ConfirmBoxResponse) => {
                    if (_Response.Response.Action) {
                        
                        _Item.remove().then((response) => {
                            // removed
                            this.PersonContactList = this.PersonContactList.filter(item => item.ID !== response.ID);
                        });
                    }
                    subscription.unsubscribe();
                });
                
            }
            
            modifyCreate(_Type: 'edit' | 'create', _Item?: INFORMATION.Interface.Contact.IPersonContact): void {
    
                const containerInput = new LayoutCommon.Class.ContainerInput<InformationDependenciesPersonContact.Interface.IContainerInputData>(
                    _Type, new InformationDependenciesPersonContact.Class.ContainerInputData()
                );
    
                if (_Item) {
                    containerInput.ContainerInputData.PersonContact = _Item;
                }
                const router: Router                         = ServiceLocator.injector.get(Router);
                containerInput.ContainerInputData.RedirectTo = router.url;
    
                router.navigate(['/kontakt'], {state: containerInput});
    
            }
        
            async dataFetch(_UserID: string): Promise<this> {
            
                return await new Promise(resolve => {
                
                    const personContact                                                      = new INFORMATION.Class.Contact.PersonContact();
                    const personContactPromise                                               = personContact.personContactList();
                    const basicFavoriteContact: INFORMATION.Interface.FavoriteContact.IBasic = new INFORMATION.Class.FavoriteContact.Basic();
                    const queryFavoriteContact                                               = ref => ref.where('UserID', '==', _UserID);
                    const basicFavoriteContactPromise                                        = basicFavoriteContact.list(queryFavoriteContact);
                
                    const promises: [
                        Promise<INFORMATION.Interface.Contact.IPersonContact[]>,
                        Promise<INFORMATION.Interface.FavoriteContact.IBasic[]>,
                    ] = [personContactPromise, basicFavoriteContactPromise];
                
                    Promise.all(promises).then((response) => {
                        this.PersonContactList    = response[0];
                        this.FavoriteRelationList = response[1];
                        resolve(this);
                    });
                });
            }
        } // class ContactListCore
        
        export class ContactDialog implements InformationDependenciesPersonContact.Interface.IContactDialog {
            
            modifyCreateContact<T>(_ContainerInput: T, _Type: 'edit' | 'create', _Item?: INFORMATION.Interface.Contact.IBasic): Observable<Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>> {
                
                const dialogPopups: DialogClass.Worker = new DialogClass.Worker();
                
                return dialogPopups.generatePopupFull(
                    ContactContainerComponent,
                    _ContainerInput
                    , {
                        Width           : '400px',
                        ColorType       : (DialogEnum.DialogColorTypes.STANDARD),
                        ShowButtons     : true,
                        CustomButtonList: [
                            {
                                Title          : _Type === 'create' ? 'Add' : 'Save',
                                ColorType      : DialogEnum.ButtonColorTypes.SUCCESS,
                                UniqueKeyAction: _Type,
                                Payload        : null
                            },
                            {
                                Title          : 'Cancel',
                                ColorType      : DialogEnum.ButtonColorTypes.LIGHT,
                                UniqueKeyAction: 'cancel',
                                Payload        : null
                            }
                        ]
                    });
            }
        }
        
        export class ContainerCore extends ContactDialog implements InformationDependenciesPersonContact.Interface.IContainerCore {
            
            ContainerInputData: InformationDependenciesPersonContact.Interface.IContainerInputData = new InformationDependenciesPersonContact.Class.ContainerInputData();
            ContainerInputDataReference: InformationDependenciesPersonContact.Interface.IContainerInputData;
            
            async dataFetch(): Promise<this> {
                
                return await new Promise(resolve => {
                    
                    const basicContact: INFORMATION.Interface.Contact.IBasic = new INFORMATION.Class.Contact.Basic();
                    basicContact.list().then(resp => {
                        // this.ContainerInputData.PersonContact.ContactList = resp;
                        resolve(this);
                    });
                    
                });
            }
    
        }
    
        export class ContainerInputData implements InformationDependenciesPersonContact.Interface.IContainerInputData {
            PersonContact: INFORMATION.Interface.Contact.IPersonContact = new INFORMATION.Class.Contact.PersonContact();
            RedirectTo: string                                          = null;
        }
    
    
    } // namespace Class
    
} // namespace InformationDependenciesPersonContact
