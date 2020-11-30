export namespace Global {
    
    export namespace Interface {
        
        export namespace Messaging {
            
            export interface IResponse<T> {
                Response: T;
                Message: Global.Interface.Messaging.IMessage;
            } // interface IBaseResponse
            
            export interface IMessage {
                Code: string;
                Title: string;
                Message: string;
                Description: string;
                CustomData: any;
                
                setCode(_Code: string): void;
                
                setTitle(_Title: string): void;
                
                setMessage(_Message: string): void;
                
                setDescription(_Description: string): void;
                
                setCustomData(_CustomData: any): void;
                
            } // interface IMessage
            
        }
        
        export namespace Data {
            
            export interface IDataValidation {
                
                isValid(_ValidationList?: Global.Interface.Layout.IValidation[]): boolean;
                
                customValidation(_ValidationList: Global.Interface.Layout.IValidation[]): boolean;
                
            } // interface IDataValidation
            
            export interface IDataOperations {
                
                compareWith(_Item: any): boolean;
                
                copyValuesFrom(_Data?: any): any;
                
            } // interface IDataControl
            
            export interface IDataControl {
                
                create(_Type?: string): Promise<any>;
                
                remove(): Promise<any>;
                
                update(_Data?: any): Promise<any>;
                
                read(_Data: any): any;
                
                list(_Criteria?: any): Promise<any>;
                
            } // interface IDataControl
            
            export interface ICommonObjectMarkup extends IDataValidation, IDataOperations, IDataControl {
                
                ID: string;
                CreatedDate: Date;
                IsActive: boolean;
                
            } // interface CommonObjectMarkup
            
            
        }  // namespace Data
        
        export namespace Layout {
            export interface IValidation {
                PropertyName: string;
                ValidationMethod: any;
                IsValid: boolean;
                Message?: string;
            }
        }  // namespace Layout
        
    } // namespace Interface
    
    export namespace Class {
        
        export namespace Messaging {
            
            export class Message implements Global.Interface.Messaging.IMessage {
                Code: string        = '';
                Title: string       = '';
                Message: string     = '';
                Description: string = '';
                CustomData: any     = null;
                
                [CustomData: string]: any;
                
                // Response: any;
                
                constructor(_Code?: string) {
                    if (_Code) {
                        this.Code = _Code;
                    }
                    
                }
                
                setCode(_Code: string): void {
                    this.Code = _Code;
                }
                
                setTitle(_Title: string): void {
                    this.Title = _Title;
                }
                
                setMessage(_Message: string): void {
                    this.Message = _Message;
                }
                
                setDescription(_Description: string): void {
                    this.Description = _Description;
                }
                
                setCustomData(_CustomData: any): void {
                    this.CustomData = {...this.CustomData, ..._CustomData};
                }
            } // class Message
            
        }
        
        export namespace Data {
            
            export class CommonDataValidation {
                
                customValidation(_ValidationList: Global.Interface.Layout.IValidation[]): boolean {
                    let lassie = true;
                    if (_ValidationList) {
                        _ValidationList.forEach(val => {
                            val.IsValid = val.ValidationMethod(this[val.PropertyName]);
                            if (!val.IsValid) {
                                lassie = false;
                            }
                        });
                        
                        return lassie;
                    }
                }
                
                
            } // class CommonDataControl
            
            export class CommonDataControl extends CommonDataValidation {
                
                copyValuesFrom(_Data: any): any {
                    if (typeof _Data !== 'object') {
                        return this;
                    }
                    
                    const dataKeys = Object.keys(_Data);
                    const thisKeys = Object.keys(this);
                    
                    dataKeys.forEach(key => {
                        
                        if (thisKeys.find(tKey => tKey === key || tKey === '_' + key)) {
                            
                            if (key.includes('Date')) {
                                const date = Date.parse(_Data[key]);
                                if (date) {
                                    this[key] = new Date(date);
                                } else {
                                    this[key] = _Data[key];
                                }
                            } else {
                                this[key] = _Data[key];
                            }
                        }
                    });
                    
                    return this;
                }
                
            } // class CommonDataControl
            
            export class CommonObjectMarkup extends Global.Class.Data.CommonDataControl {
                ID: string        = null;
                CreatedDate: any  = null;
                IsActive: boolean = true;
            }
            
        } // namespace Data
        
    } // namespace Class
    
    export namespace Enum {
    
    
    } // namespace Class
    
} // namespace Global
