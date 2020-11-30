import {SECURITY} from '../models';

export namespace AuthDependencies {
    
    export namespace Interface {
        
        export interface IContainerCore {
            ContainerInputData: AuthDependencies.Interface.IContainerInputData;
            ContainerInputDataReference: AuthDependencies.Interface.IContainerInputData;
            
            dataFetch(): Promise<any>;
            
        } // interface IContainerCore
        
        export interface IContainerInputData {
            Credentials: SECURITY.Interface.Handshake.ICredentials;
        } // interface IContainerInputData
        
    } // namespace Interface
    
    export namespace Class {
        
        export class ContainerCore implements AuthDependencies.Interface.IContainerCore {
            
            ContainerInputData: AuthDependencies.Interface.IContainerInputData = new AuthDependencies.Class.ContainerInputData();
            ContainerInputDataReference: AuthDependencies.Interface.IContainerInputData;
            
            async dataFetch(): Promise<this> {
                
                return await new Promise(resolve => {
                    
                    // additional async calls comes here //
                    
                    resolve(this);
                    
                });
                
            }
        }
        
        export class ContainerInputData implements AuthDependencies.Interface.IContainerInputData {
            Credentials: SECURITY.Interface.Handshake.ICredentials = new SECURITY.Class.Handshake.Credentials();
        }
        
        
    } // namespace Class
    
}


