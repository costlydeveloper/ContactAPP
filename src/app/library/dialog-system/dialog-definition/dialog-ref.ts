import {Observable, Subject} from 'rxjs';
import {DialogClass} from './dialog-class';
import {DialogInterface} from './dialog-interface';

export class DialogRef {
    
    private readonly _afterClosed: any                              = new Subject<DialogClass.ConfirmBoxResponse>();
    afterClosed: Observable<DialogClass.ConfirmBoxResponse>         = this._afterClosed.asObservable();
    private readonly _afterLoader: any                              = new Subject<string>();
    afterLoader: Observable<string>                                 = this._afterLoader.asObservable();
    private readonly _buttonOnChange: any                           = new Subject<DialogInterface.ICustomButtonConfig>();
    buttonOnChange: Observable<DialogInterface.ICustomButtonConfig> = this._buttonOnChange.asObservable();
    
    private readonly _buttonList: any                             = new Subject<DialogInterface.ICustomButtonConfig[]>();
    buttonList: Observable<DialogInterface.ICustomButtonConfig[]> = this._buttonList.asObservable();
    
    constructor() {
    }
    
    close(_Result?: any): void {
        this._afterClosed.next(_Result);
    }
    
    customButtonOnChange(_Button: DialogInterface.ICustomButtonConfig): void {
        this._buttonOnChange.next(_Button);
    }
    
    setButtonList(_ButtonList: DialogInterface.ICustomButtonConfig[]): void {
        this._buttonList.next(_ButtonList);
    }
    
    closeLoader(_ComponentName: string): void {
        this._afterLoader.next(_ComponentName);
    }
    
}
