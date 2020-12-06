import {INFORMATION} from '../models';
import {DialogClass} from '../../../library/dialog-system/dialog-definition/dialog-class';
import {DialogEnum} from '../../../library/dialog-system/dialog-definition/dialog-enum';

export namespace InformationDependenciesFavoriteContact {
    
    export namespace Interface {
        
        export interface IListCore {
            PersonContactList: INFORMATION.Interface.Contact.IPersonContact[];
            FavoriteRelationList: INFORMATION.Interface.FavoriteContact.IBasic[];
            
            remove(_Item: INFORMATION.Interface.FavoriteContact.IBasic): void;
            
            dataFetch(_UserID: string): Promise<this>;
            
        } // class ContactListCore
        
        
    } // namespace Interface
    
    export namespace Class {
        
        export class ListCore implements InformationDependenciesFavoriteContact.Interface.IListCore {
            
            PersonContactList: INFORMATION.Interface.Contact.IPersonContact[]    = [];
            FavoriteRelationList: INFORMATION.Interface.FavoriteContact.IBasic[] = [];
            
            remove(_Item: INFORMATION.Interface.FavoriteContact.IBasic): void {
                
                const confirmation = new DialogClass.ConfirmBox(`Remove`, `Remove from favorites?`, {
                    ColorType : DialogEnum.DialogColorTypes.DANGER,
                    ConfirmBox: true
                });
                
                const subscription = confirmation.Dialog.response.subscribe((_Response: DialogClass.ConfirmBoxResponse) => {
                    if (_Response.Response.Action) {
                        _Item.remove().then((response) => {
                            // removed
                            this.PersonContactList = this.PersonContactList.filter(item => item.ID !== response.PersonID);
                        });
                    }
                    subscription.unsubscribe();
                });
                
            }
            
            async dataFetch(_UserID: string): Promise<this> {
                
                return await new Promise((resolve, reject) => {
                    
                    const basicFavoriteContact: INFORMATION.Interface.FavoriteContact.IBasic = new INFORMATION.Class.FavoriteContact.Basic();
                    const queryFavoriteContact                                               = ref => ref.where('UserID', '==', _UserID);
                    const basicFavoriteContactPromise                                        = basicFavoriteContact.list(queryFavoriteContact).then(resp => {
                        this.FavoriteRelationList = resp;
                        const personIDList        = this.FavoriteRelationList.map(item => item.PersonID);
                        const queryPerson         = ref => ref.where('ID', 'in', personIDList);
                        const personContact       = new INFORMATION.Class.Contact.PersonContact();
                        personContact.personContactList(queryPerson).then(resp2 => {
                            this.PersonContactList = resp2;
                            return resolve(this);
                        }).catch(error => reject(new Error('ERR')));
                        
                    }).catch(error => reject(new Error('ERR')));
                    
                });
            }
        } // class ContactListCore
        
    } // namespace Class
    
} // namespace InformationDependenciesFavoriteContact
