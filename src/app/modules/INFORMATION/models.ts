import {Global} from '../../dependencies/global';
import {AngularFirestore} from '@angular/fire/firestore';
import {ServiceLocator} from '../../library/data-operation/locator.service';
import {BASE} from '../BASE/models';

export namespace INFORMATION {
    
    export namespace Interface {
        
        export namespace Contact {
            
            export interface ICategory {
                ID: number;
                Title: string;
                EnumName: string;
                IsActive: boolean;
            } // IBasic
            
            export interface IBasic extends Global.Interface.Data.ICommonObjectMarkup {
                ContactCategoryID: number;
                PersonID: string;
                Title: string;
            } // IBasic
            
            export interface IPersonContact extends BASE.Interface.Person.IBasic {
                ContactList: INFORMATION.Interface.Contact.IBasic[];
                
                saveContacts(): Promise<boolean>;
                
                personContactList(_Criteria?: any): Promise<INFORMATION.Interface.Contact.IPersonContact[]>;
            } // IPersonContact
            
        } // namespace Contact
        
    } // namespace Interface
    
    export namespace Class {
        
        export namespace Contact {
            
            export class Basic extends Global.Class.Data.CommonObjectMarkup implements INFORMATION.Interface.Contact.IBasic {
                
                ContactCategoryID: number = null;
                PersonID: string;
                Title: string             = null;
                
                constructor() {
                    super();
                }
                
                async create(): Promise<INFORMATION.Interface.Contact.IBasic> {
                    return await new Promise((resolve, reject) => {
                        if (this.isValid()) {
                            const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                            firestore.collection('Contact').add(this).then(docRef => {
                                if (docRef) {
                                    this.ID = docRef.id;
                                }
                            });
                        } else {
                            reject('validation error');
                        }
                        
                    });
                }
                
                async read(_ID: string): Promise<INFORMATION.Interface.Contact.IBasic> {
                    
                    return await new Promise((resolve, reject) => {
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        const docItem                     = firestore.doc('Contact/' + _ID);
                        docItem.get().toPromise().then(doc => {
                            if (doc && doc.exists) {
                                const docData = doc.data();
                                this.copyValuesFrom(docData);
                                resolve(this);
                            } else {
                                reject();
                            }
                        }).catch(error => {
                            return new Error('ERR');
                        });
                    });
                }
                
                async update(): Promise<INFORMATION.Interface.Contact.IBasic> {
                    return await new Promise((resolve, reject) => reject);
                }
                
                async remove(): Promise<INFORMATION.Interface.Contact.IBasic> {
                    return await new Promise((resolve, reject) => reject);
                }
                
                async list(_Criteria: any): Promise<INFORMATION.Interface.Contact.IBasic[]> {
                    return await new Promise((resolve, reject) => {
                        
                        const list: INFORMATION.Interface.Contact.IBasic[] = [];
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        
                        const subscribe = firestore.collection('Contact', _Criteria).valueChanges().subscribe(responseData => {
                            
                            responseData.forEach((person) => {
                                const basicItem: INFORMATION.Interface.Contact.IBasic = new INFORMATION.Class.Contact.Basic();
                                basicItem.copyValuesFrom(person);
                                list.push(basicItem);
                            });
                            
                            subscribe.unsubscribe();
                            resolve(list);
                            
                        });
                        
                    });
                }
                
                
                isValid(_ValidationList?: Global.Interface.Layout.IValidation[]): boolean {
                    
                    let additional = true;
                    
                    const basic = !(
                        !this.Title
                    );
                    
                    if (_ValidationList) {
                        additional = this.customValidation(_ValidationList);
                    }
                    
                    return basic && additional;
                }
                
                ifExist(): boolean {
                    return true;
                }
                
                compareWith(_Item: any): any {
                }
                
            }
            
            export class PersonContact extends BASE.Class.Person.Basic implements INFORMATION.Interface.Contact.IPersonContact {
                ContactList: INFORMATION.Interface.Contact.IBasic[] = [];
                
                async personContactList(_Criteria?: any): Promise<INFORMATION.Interface.Contact.IPersonContact[]> {
                    return await new Promise((resolve, reject) => {
                        
                        const basicContact: INFORMATION.Interface.Contact.IBasic = new INFORMATION.Class.Contact.Basic();
                        
                        this.list<INFORMATION.Interface.Contact.IPersonContact>().then((personContactList) => {
                            
                            const promises = [];
                            
                            personContactList.forEach(person => {
                                const queryContact = ref => ref.where('PersonID', '==', person.ID);
                                
                                promises.push(basicContact.list(queryContact).then(responseData => {
                                    
                                    person.ContactList = responseData;
                                    
                                }));
                                
                            });
                            
                            Promise.all(promises).then(() => resolve(personContactList));
                            
                            
                        });
                        
                    });
                }
                
                async saveContacts(): Promise<boolean> {
                    return await new Promise((resolve, reject) => reject);
                }
                
            }
            
        } // namespace Contact
        
        
    } // namespace Class
    
    export namespace Enum {
        
        export namespace Contact {
            
            export enum Category {
                NONE         = 0,
                MOBILE_PHONE = 1,
                FIXED_PHONE  = 2,
                EMAIL        = 3,
                PAGER        = 4,
            }
            
        }
    }
    
} // namespace INFORMATION
