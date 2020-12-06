import {INFORMATION} from '../models';
import ContactCategoryList from '../../../../assets/json/contact-category-list.json';


export namespace InformationDependenciesContact {
    
    export namespace Interface {
        
        export interface IContainerCore {
            FormData: InformationDependenciesContact.Interface.IContainerFormData;
            ContainerInputData: InformationDependenciesContact.Interface.IContainerInputData;
            ContainerInputDataReference: InformationDependenciesContact.Interface.IContainerInputData;
            
            dataFetch(): Promise<any>;
            
        } // class ContactListCore
        
        export interface IContainerInputData {
            Contact: INFORMATION.Interface.Contact.IBasic;
            CustomData: any;
        } // interface IContainerInputData
        
        export interface IContainerFormData {
            ContactCategoryList: INFORMATION.Interface.Contact.ICategory[];
        } // interface IContainerFormData
        
    } // namespace Interface
    
    export namespace Class {
        
        export class ContainerCore implements InformationDependenciesContact.Interface.IContainerCore {
            FormData: InformationDependenciesContact.Interface.IContainerFormData            = new ContainerFormData();
            ContainerInputData: InformationDependenciesContact.Interface.IContainerInputData = new InformationDependenciesContact.Class.ContainerInputData();
            ContainerInputDataReference: InformationDependenciesContact.Interface.IContainerInputData;
            
            async dataFetch(): Promise<this> {
                
                return await new Promise(resolve => {
                    
                    this.FormData.ContactCategoryList = ContactCategoryList;
                    resolve(this);
                    
                });
                
            }
        }
        
        export class ContainerInputData implements InformationDependenciesContact.Interface.IContainerInputData {
            Contact: INFORMATION.Interface.Contact.IBasic = new INFORMATION.Class.Contact.Basic();
            CustomData: any                               = null;
        }
        
        export class ContainerFormData implements InformationDependenciesContact.Interface.IContainerFormData {
            ContactCategoryList: INFORMATION.Interface.Contact.ICategory[] = [];
            
        }
        
        
    } // namespace Class
    
} // namespace InformationLayoutDependencies
