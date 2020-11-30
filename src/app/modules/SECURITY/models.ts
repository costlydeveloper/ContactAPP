import {Global} from '../../dependencies/global';
import {BASE} from '../BASE/models';

export namespace SECURITY {
    
    export namespace Interface {
        
        export namespace Handshake {
            
            export interface ILoggedUser {
                Person: BASE.Interface.Person.IBasic;
                User: BASE.Interface.User.IBasic;
                
                dataFetch(_User: BASE.Interface.User.IBasic): Promise<SECURITY.Interface.Handshake.ILoggedUser>;
            }
            
            export interface ICredentials extends Global.Interface.Data.IDataValidation {
                Username: string;
                Password: string;
                
                handshake(): Promise<SECURITY.Interface.Handshake.ILoggedUser>;
            }
            
        } // namespace Handshake
        
    } // namespace Interface
    
    export namespace Class {
        
        export namespace Handshake {
            
            export class LoggedUser implements SECURITY.Interface.Handshake.ILoggedUser {
                Person: BASE.Interface.Person.IBasic = new BASE.Class.Person.Basic();
                User: BASE.Interface.User.IBasic     = new BASE.Class.User.Basic();
                
                async dataFetch(_User: BASE.Interface.User.IBasic): Promise<SECURITY.Interface.Handshake.ILoggedUser> {
                    return await new Promise((resolve, reject) => {
                        this.User           = _User;
                        const person        = new BASE.Class.Person.Basic();
                        const personPromise = person.read('AbFgXc91zZhsXpAfgKN1');
                        
                        Promise.all([personPromise]).then(resp => {
                            this.Person = resp[0];
                            
                            resolve(this);
                            
                        }).catch(error => {
                            return reject(new Error('ERR'));
                        });
                        
                    });
                }
                
            } // class UserLogin
            
            export class Credentials extends Global.Class.Data.CommonDataValidation implements Global.Interface.Data.IDataValidation, SECURITY.Interface.Handshake.ICredentials {
                Username: string = null;
                Password: string = null;
                
                async handshake(): Promise<SECURITY.Interface.Handshake.ILoggedUser> {
                    return await new Promise((resolve, reject) => {
                        
                        // TODO here comes authorization fetch real user ID
                        const userID = '1'; // hardcoded, here needs to be a real ID from db
                        
                        const userBasic = new BASE.Class.User.Basic();
                        userBasic.read(userID).then(user => {
                            const userLogin: SECURITY.Interface.Handshake.ILoggedUser = new SECURITY.Class.Handshake.LoggedUser();
                            userLogin.dataFetch(user).then(resp => {
                                return resolve(resp);
                                
                            }).catch(error => {
                                return reject(new Error('ERR'));
                            });
                            
                        }).catch(error => {
                            return reject(new Error('ERR'));
                        });
                    });
                }
                
                isValid(_ValidationList?: Global.Interface.Layout.IValidation[]): boolean {
                    
                    let additional = true;
                    
                    const basic = !(
                        !this.Username
                        || !this.Password
                    );
                    
                    if (_ValidationList) {
                        additional = this.customValidation(_ValidationList);
                    }
                    
                    return basic && additional;
                }
                
            } // class UserLogin
            
        } // namespace Handshake
        
    } // namespace Class
    
} // namespace INFORMATION
