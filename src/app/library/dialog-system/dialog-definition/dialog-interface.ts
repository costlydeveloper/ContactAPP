import {Observable} from 'rxjs';
import {DialogEnum} from './dialog-enum';
import {DialogData} from './dialog-class';
import {Type} from '@angular/core';
import {DialogRef} from './dialog-ref';

export namespace DialogInterface {
    
    export interface IDialogConfigItem {
        DialogUniqueID?: string;
        ColorType?: DialogEnum.DialogColorTypes;
        Width?: string;
        Height?: string;
        AlertBox?: boolean;
        ToastMessage?: boolean;
        ToastMessageConfig?: IToastMessageConfig;
        ShowButtons?: boolean;
        Loader?: any;
        ConfirmBox?: boolean;
        CustomButtonList?: ICustomButtonConfig[];
    }
    
    export interface IToastMessageConfig {
        AutoClose?: boolean;
        AutoCloseDelay?: number; // milliseconds
    }
    
    export interface ICustomButtonConfig {
        Title: string;
        ColorType: DialogEnum.ButtonColorTypes | null;
        UniqueKeyAction: string;
        Payload?: any;
        Success?: boolean;
    }
    
    export interface IDialogConfig {
        DialogConfig: IDialogConfigItem;
    }
    
    export interface IConfirmBoxResponse {
        Action: any;
        DialogUniqueID: string;
        Data: any;
        Success: boolean;
    }
    
    export interface IDialogFrame {
        response: Observable<any>;
    }
    
    export interface IPopupInject {
        Component: any;
        Loader?: any;
        Data: any;
        Width?: string;
        Height?: string;
        ConfirmBox?: boolean;
    }
    
    export interface IConfirmBox {
        Dialog: DialogInterface.IDialogFrame;
    } // interface IConfirmBox
    
} // namespace Modal

export namespace ToastInterface {
    
    export interface ToastRaw {
        Config: DialogData;
        ComponentType: Type<any>;
        Map: WeakMap<object, any>;
        DialogRef: DialogRef;
    }
}
