import {DialogInterface} from './dialog-interface';
import {ToastMessageComponent} from '../layout-types/toast-message/toast-message.component';
import {ConfirmBoxComponent} from '../layout-types/confirm-box/confirm-box.component';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DialogEnum} from './dialog-enum';
import {DialogService} from './dialog.service';
import {ToastService} from './toast.service';
import {Global} from '../../../dependencies/global';
import {Type} from '@angular/core';

export class DialogData extends Global.Class.Messaging.Message {

} // DialogData

export namespace DialogClass {
    
    export class DialogConfig implements DialogInterface.IDialogConfig {
        DialogConfig: DialogInterface.IDialogConfigItem = {
            
            DialogUniqueID    : Math.random().toString(36).substr(2, 9),
            ColorType         : DialogEnum.DialogColorTypes.STANDARD,
            Width             : 'auto',
            Height            : 'auto',
            AlertBox          : false,
            ToastMessage      : false,
            ToastMessageConfig: {
                
                AutoClose     : true,
                AutoCloseDelay: 2000, // milliseconds
            },
            ShowButtons       : false,
            Loader            : null,
            ConfirmBox        : false,
            CustomButtonList  : []
        };
        
        constructor(_CustomData: Global.Interface.Messaging.IMessage | DialogInterface.IDialogConfigItem) {
            
            let parentObject = null;
            if ('CustomData' in _CustomData) { // type guard
                
                if (_CustomData.CustomData) {
                    // ukoliko je popunjen objekt djelomičan
                    if (_CustomData.CustomData.hasOwnProperty('DialogConfig')) {
                        parentObject = _CustomData.CustomData.DialogConfig;
                    }
                }
            } else {
                parentObject = _CustomData;
            }
            
            this.checkSetProperty('ColorType', parentObject);
            this.checkSetProperty('Width', parentObject);
            this.checkSetProperty('Height', parentObject);
            this.checkSetProperty('AlertBox', parentObject);
            this.checkSetProperty('ToastMessage', parentObject);
            this.checkSetProperty('ToastMessageConfig', parentObject);
            this.checkSetProperty('Loader', parentObject);
            this.checkSetProperty('ConfirmBox', parentObject);
            this.checkSetProperty('CustomButtonList', parentObject);
            this.checkSetProperty('ShowButtons', parentObject);
            this.checkSetProperty('DialogUniqueID', parentObject);
        }
        
        private checkSetProperty(_PropertyName: string, _Parent: DialogInterface.IDialogConfigItem): void {
            if (this.DialogConfig.hasOwnProperty(_PropertyName)) {
                if (_Parent) { // ukoliko ne postoji parent popunit će se sa default vrijednostima
                    this.DialogConfig[_PropertyName] = _Parent.hasOwnProperty(_PropertyName) ? _Parent[_PropertyName] : this.DialogConfig[_PropertyName];
                }
            }
        }
    }
    
    export class ConfirmBoxResponse implements Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse> {
        public Response: DialogInterface.IConfirmBoxResponse = {
            DialogUniqueID: '',
            Action        : null,
            Data          : null,
            Success       : false
        };
        Message: Global.Interface.Messaging.IMessage         = new Global.Class.Messaging.Message();
        
        constructor(_DialogUniqueID: string) {
            this.Response.DialogUniqueID = _DialogUniqueID;
        }
    } // class ConfirmBoxResponse
    
    export class DialogFrame {
        
        response: Observable<DialogClass.ConfirmBoxResponse>;
        
        constructor(private Component: Type<any>, private MessageObject: Global.Interface.Messaging.IMessage) {
            
            const ref     = DialogService.instance.open(Component, MessageObject);
            this.response = ref.afterClosed;
        }
        
        
    } // class DialogFrame
    
    export class ToastFrame {
        
        response: Observable<DialogClass.ConfirmBoxResponse>;
        isActive: Promise<boolean>;
        
        constructor(private Component: any, private MessageObject: Global.Interface.Messaging.IMessage) {
            this.isActive = new Promise<boolean>(resolve => {
                const toastRef = ToastService.instance.openToast(Component, MessageObject);
                toastRef.then(resp => {
                    this.response = resp.afterClosed;
                    resolve(true);
                });
            });
            
        }
        
        
    } // class DialogFrame
    
    
    export class Popups {
        
        async onToast(_ToastConf: { Title?: string, Description?: string, Color?: DialogEnum.DialogColorTypes }): Promise<any> {
            return await new Promise<boolean>(resolve => {
                const globalMessage: Global.Interface.Messaging.IMessage = new Global.Class.Messaging.Message();
                globalMessage.setTitle(_ToastConf.Title ? _ToastConf.Title : '');
                globalMessage.setDescription(_ToastConf.Description ? _ToastConf.Description : '');
                globalMessage.setCustomData(new DialogClass.DialogConfig({
                    ColorType         : (_ToastConf.Color ? _ToastConf.Color : DialogEnum.DialogColorTypes.STANDARD),
                    ToastMessage      : true,
                    ToastMessageConfig: {
                        AutoCloseDelay: 3000,
                        AutoClose     : true
                    }
                }));
                
                const toastMessage = new DialogClass.ToastFrame(ToastMessageComponent, globalMessage);
                toastMessage.isActive.then(resp => {
                    const subscription = toastMessage.response.subscribe((toastResponse: Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>) => {
                        resolve(); // zatvorena poruka
                        subscription.unsubscribe();
                    });
                });
            });
        }
        
        onAlert(_ToastConf: { Title?: string, Description?: string, Color?: DialogEnum.DialogColorTypes }): void {
            const globalMessage: Global.Interface.Messaging.IMessage = new Global.Class.Messaging.Message();
            globalMessage.setTitle(_ToastConf.Title ? _ToastConf.Title : '');
            globalMessage.setDescription(_ToastConf.Description ? _ToastConf.Description : '');
            globalMessage.setCustomData(new DialogClass.DialogConfig({
                ColorType : (_ToastConf.Color ? _ToastConf.Color : DialogEnum.DialogColorTypes.STANDARD),
                AlertBox  : true,
                ConfirmBox: true
            }));
            const toastMessage = new DialogClass.DialogFrame(ConfirmBoxComponent, globalMessage);
        }
        
        onConfirm(_ToastConf: { Title?: string, Description?: string, Color?: DialogEnum.DialogColorTypes }): Observable<any> {
            // <editor-fold desc="*** ConfirmBox ***">
            
            const confirmation = new DialogClass.ConfirmBox(_ToastConf.Title ? _ToastConf.Title : '', _ToastConf.Description ? _ToastConf.Description : '', {
                ConfirmBox: true,
                ColorType : (_ToastConf.Color ? _ToastConf.Color : DialogEnum.DialogColorTypes.STANDARD),
            });
            return confirmation.Dialog.response;
            // </editor-fold>
        }
        
    }
    
    // / DialogClass.Worker
    
    export class Worker {
        
        constructor() {
        }
        
        generatePopup(_Data: DialogInterface.IPopupInject): Observable<Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>> {
            const globalMessage: Global.Interface.Messaging.IMessage = new Global.Class.Messaging.Message();
            globalMessage.setCustomData(_Data.Data);
            globalMessage.setCustomData(new DialogClass.DialogConfig({
                Width     : (_Data.Width ? _Data.Width : '1000px'),
                Height    : (_Data.Height ? _Data.Height : 'auto'),
                Loader    : (_Data.Loader ? _Data.Loader : null),
                ConfirmBox: (_Data.ConfirmBox ? _Data.ConfirmBox : false)
            }));
            
            return new DialogClass.DialogFrame(_Data.Component, globalMessage).response.pipe(tap((_Response: Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>) => _Response));
        }
        
        generatePopupFull(_Component: any, _CustomData: any, _DialogConfig: DialogInterface.IDialogConfigItem): Observable<Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>> {
            const globalMessage: Global.Interface.Messaging.IMessage = new Global.Class.Messaging.Message();
            globalMessage.setCustomData(_CustomData);
            globalMessage.setCustomData(new DialogClass.DialogConfig(_DialogConfig));
            
            return new DialogClass.DialogFrame(_Component, globalMessage).response.pipe(tap((_Response: Global.Interface.Messaging.IResponse<DialogInterface.IConfirmBoxResponse>) => _Response));
        }
        
    } // class Popup
    
    export class ConfirmBox implements DialogInterface.IConfirmBox {
        
        public Dialog: DialogInterface.IDialogFrame;
        
        constructor(_Title: string, _Description: string, _DialogConfig: DialogInterface.IDialogConfigItem) {
            
            const globalMessage: Global.Interface.Messaging.IMessage = new Global.Class.Messaging.Message();
            globalMessage.setTitle(_Title);
            globalMessage.setDescription(_Description);
            globalMessage.setCustomData(new DialogClass.DialogConfig(_DialogConfig));
            
            this.Dialog = new DialogClass.DialogFrame(ConfirmBoxComponent, globalMessage);
            
        }
    } // ConfirmBox
    
    export class DeleteConfirmBox implements DialogInterface.IConfirmBox {
        
        public Dialog: DialogInterface.IDialogFrame;
        
        constructor(_Title: string, _Description: string, _DialogConfig: DialogInterface.IDialogConfigItem) {
            
            if (!_Title) {
                _Title       = 'Dali ste sigurni da želite izbrisati odabranu stavku?';
                _Description = 'Potvrdom ove akcije izbrisati će vam se stavka.';
            }
            
            const globalMessage: Global.Interface.Messaging.IMessage = new Global.Class.Messaging.Message();
            globalMessage.setTitle(_Title);
            globalMessage.setDescription(_Description);
            globalMessage.setCustomData(new DialogClass.DialogConfig(_DialogConfig));
            
            this.Dialog = new DialogClass.DialogFrame(ConfirmBoxComponent, globalMessage);
            
        }
    } // ConfirmBox
    
    // </editor-fold>
    
} // namespace DialogEngine
