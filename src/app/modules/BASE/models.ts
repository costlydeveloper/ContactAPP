import {Global} from '../../dependencies/global';
import {ServiceLocator} from '../../library/data-operation/locator.service';
import {AngularFirestore} from '@angular/fire/firestore';

export namespace BASE {
    
    export namespace Interface {
        
        export namespace Person {
            
            export interface IBasic extends Global.Interface.Data.ICommonObjectMarkup {
                GenderCategoryID: number;
                Name: string;
                Surname: string;
                BirthDate: any;
                Identification: string;
            } // IBasic
            
        } // namespace Person
        
        export namespace User {
            
            export interface IBasic extends Global.Interface.Data.ICommonObjectMarkup {
                PersonID: number;
            } // IBasic
            
        } // namespace User
        
    } // namespace Interface
    
    export namespace Class {
        
        export namespace Person {
            
            export class Basic extends Global.Class.Data.CommonObjectMarkup implements BASE.Interface.Person.IBasic {
                
                GenderCategoryID: number = null;
                Name: string             = null;
                Surname: string          = null;
                BirthDate: Date          = null;
                Identification: string   = null;
                
                
                constructor() {
                    super();
                }
                
                async create(): Promise<BASE.Interface.Person.IBasic> {
                    return await new Promise((resolve, reject) => {
                        if (this.isValid()) {
                            this.CreatedDate                  = new Date();
                            const request                     = new BASE.Class.Person.CUD(this);
                            const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                            firestore.collection('Person')
                                .add(JSON.parse(JSON.stringify(request))).then(docRef => {
                                this.ID = docRef.id;
                                
                                // todo check to set id in one shoot
                                this.update().then(resp => {
                                    resolve(this);
                                });
                                
                            }).catch(error => {
                                return reject(new Error('ERR'));
                            });
                            
                        } else {
                            return reject(new Error('ERR'));
                        }
                        
                    });
                }
                
                async read(_ID: string): Promise<BASE.Interface.Person.IBasic> {
                    
                    return await new Promise((resolve, reject) => {
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        const docItem                     = firestore.doc('Person/' + _ID);
                        docItem.get().toPromise().then(doc => {
                            if (doc && doc.exists) {
                                const docData = doc.data();
                                this.copyValuesFrom(docData);
                                return resolve(this);
                            } else {
                                return reject();
                            }
                        }).catch(error => {
                            return reject(new Error('ERR'));
                        });
                    });
                }
                
                async update(): Promise<BASE.Interface.Person.IBasic> {
                    
                    return await new Promise((resolve, reject) => {
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        const request                     = new BASE.Class.Person.CUD(this);
                        firestore.collection('Person').doc(this.ID).update(JSON.parse(JSON.stringify(request))).then(resp => {
                            return resolve(this);
                        }).catch(error => {
                            return reject(new Error('ERR'));
                        });
                    });
                }
                
                async remove(): Promise<BASE.Interface.Person.IBasic> {
                    
                    return await new Promise((resolve, reject) => {
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        
                        firestore.collection('Person').doc(this.ID).delete().then(resp => {
                            return resolve(this);
                        }).catch(error => {
                            return reject(new Error('ERR'));
                        });
                    });
                }
                
                async list<T>(_Criteria?: any): Promise<T[]> {
                    return await new Promise((resolve, reject) => {
                        
                        const personList = [];
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        
                        const subscribe = firestore.collection('Person').valueChanges().subscribe(responseData => {
                            
                            responseData.forEach((person) => {
                                const basicItem = new BASE.Class.Person.Basic();
                                basicItem.copyValuesFrom(person);
                                personList.push(basicItem);
                            });
                            
                            subscribe.unsubscribe();
                            resolve(personList);
                            
                        });
                        
                    });
                }
                
                
                isValid(_ValidationList?: Global.Interface.Layout.IValidation[]): boolean {
                    
                    let additional = true;
                    
                    const basic = !(
                        !this.Name
                        || !this.Surname
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
                
            } // IBasic
            
            export class CUD extends BASE.Class.Person.Basic {
                constructor(_Basic: BASE.Interface.Person.IBasic) {
                    super();
                    this.ID               = _Basic.ID;
                    this.GenderCategoryID = _Basic.GenderCategoryID;
                    this.Name             = _Basic.Name;
                    this.Surname          = _Basic.Surname;
                    this.BirthDate        = _Basic.BirthDate;
                    this.Identification   = _Basic.Identification;
                    this.IsActive         = _Basic.IsActive;
                    this.CreatedDate      = _Basic.CreatedDate;
                }
                
            } // class CUD
            
        } // namespace Person
        
        export namespace User {
            
            export class Basic extends Global.Class.Data.CommonObjectMarkup implements BASE.Interface.User.IBasic {
                
                PersonID: number = null;
                
                constructor() {
                    super();
                }
                
                async create(): Promise<BASE.Interface.User.IBasic> {
                    return await new Promise((resolve, reject) => {
                        if (this.isValid()) {
                            const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                            firestore.collection('User').add(this).then(docRef => {
                                if (docRef) {
                                    this.ID = docRef.id;
                                }
                            });
                        } else {
                            reject(new Error('ERR'));
                        }
                        
                    });
                }
                
                async read(_ID: string): Promise<BASE.Interface.User.IBasic> {
                    
                    return await new Promise((resolve, reject) => {
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        const docItem                     = firestore.doc('User/' + _ID);
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
                
                async update(): Promise<BASE.Interface.User.IBasic> {
                    return await new Promise((resolve, reject) => reject);
                }
                
                async remove(): Promise<BASE.Interface.User.IBasic> {
                    return await new Promise((resolve, reject) => reject);
                }
                
                async list(_Criteria: any): Promise<BASE.Interface.User.IBasic[]> {
                    return await new Promise((resolve, reject) => {
                        
                        const userList: BASE.Interface.User.IBasic[] = [];
                        
                        const firestore: AngularFirestore = ServiceLocator.injector.get(AngularFirestore);
                        
                        const subscribe = firestore.collection('User').valueChanges().subscribe(responseData => {
                            
                            responseData.forEach((user) => {
                                const basicItem: BASE.Interface.User.IBasic = new BASE.Class.User.Basic();
                                basicItem.copyValuesFrom(user);
                                userList.push(basicItem);
                            });
                            
                            subscribe.unsubscribe();
                            resolve(userList);
                            
                        });
                        
                    });
                }
                
                
                isValid(_ValidationList?: Global.Interface.Layout.IValidation[]): boolean {
                    
                    let additional = true;
                    
                    const basic = !(
                        !this.PersonID
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
                
            } // IBasic
            
        } // namespace User
        
    } // namespace Class
    
} // namespace BASE
