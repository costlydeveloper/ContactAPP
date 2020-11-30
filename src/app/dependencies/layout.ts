import {Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Global} from './global';
import {NgForm} from '@angular/forms';
import {DialogClass} from '../library/dialog-system/dialog-definition/dialog-class';
import {DialogEnum} from '../library/dialog-system/dialog-definition/dialog-enum';

export namespace LayoutAbstraction {
    
    export namespace Interface {
        
        export interface IForm<T> {
            
            // region *** Input Output ViewChild ***
            formNative: ElementRef;
            formObjectOutput: EventEmitter<T>;
            formObjectInput: T;
            validationObjectInput: Global.Interface.Layout.IValidation[];
            // endregion
            
            // region *** Standard form requirement ***
            subscriptions: Subscription[];
            
            // endregion
            
            validationAlgorithm(): void;
            
            prepareCreateValues(_FormValues: any): void;
            
            formSet(): void;
            
        } // interface IForm<T>
        
        export interface IFormTemplateDriven {
            
            // region *** Input Output ViewChild ***
            ngForm: NgForm;
            
            // endregion
            
            theChangeListener(): void;
        } // interface IFormTemplateDriven
        
    } // namespace Interface
    
    export namespace Class {
        
        @Directive()
        export abstract class Form<T> implements LayoutAbstraction.Interface.IForm<T> {
            
            // region *** Input Output ViewChild ***
            @ViewChild('formNative', {static: true}) formNative: ElementRef;
            @Output() formObjectOutput: EventEmitter<T>                           = new EventEmitter<T>();
            @Input() formObjectInput: T                                           = null;
            @Input() validationObjectInput: Global.Interface.Layout.IValidation[] = [];
            // endregion
            
            // region *** Standard form requirement ***
            subscriptions: Subscription[] = [];
            
            // endregion
            
            validationAlgorithm(_JustRemoveRedLines?: boolean): void {
                
                this.validationObjectInput.forEach(validator => {
                    let htmlElement: Element = this.formNative.nativeElement.querySelectorAll('[data-validation-property^="' + validator.PropertyName + '"]')[0] as HTMLElement;
                    if (htmlElement) {
                        htmlElement = htmlElement.closest('.validation-element');
                        if (validator.IsValid) {
                            htmlElement.classList.remove('invalid-field');
                        } else {
                            htmlElement.classList.add('invalid-field');
                        }
                    }
                });
            }
            
            removeElementValidationAlgorithm(_JustRemoveRedLines?: boolean): void {
                const htmlElementList: NodeListOf<HTMLElement> = document.querySelectorAll('.invalid-field') as NodeListOf<HTMLElement>;
                if (htmlElementList.length) {
                    htmlElementList.forEach(element => {
                        element.classList.remove('invalid-field');
                    });
                    
                }
            }
            
            prepareCreateValues(_FormValues: any): void {
                // metoda će biti pregažena metodom iz forme kada ju developer napiše
            }
            
            formSet(): void {
                // metoda će biti pregažena metodom iz forme kada ju developer napiše
            }
            
        }
        
        @Directive()
        export abstract class FormCommonTemplateDriven<T> extends LayoutAbstraction.Class.Form<T> implements LayoutAbstraction.Interface.IFormTemplateDriven {
            
            // region *** Input Output ViewChild ***
            @ViewChild('form', {static: true}) ngForm: NgForm;
            
            // endregion
            
            theChangeListener(): void {
                // timeout je stavljen to je bug u angularu v 8.3.19 (provjeriti u novijoj verziji), odgađa nepotrebno okidanje forme pri inicijalizaciji komponente
                
                setTimeout(() => {
                    this.subscriptions.push(this.ngForm.form.valueChanges.subscribe(val => {
                        this.prepareCreateValues(val);
                        this.removeElementValidationAlgorithm();
                        this.listenFormChanges();
                        this.formObjectOutput.emit(this.formObjectInput);
                    }));
                }, 0);
            }
            
            listenFormChanges(): any {
            
            }
        }
        
        @Directive()
        export abstract class Container<T> implements OnDestroy {
            
            // region *** Content ***
            contentIsReady: boolean         = false;
            toastValidationIsReady: boolean = true;
            subscriptions: Subscription[]   = [];
            inputData: LayoutCommon.Interface.IContainerInput<T>;
            // endregion
            
            // region *** Dialog ***
            fullResponse: DialogClass.ConfirmBoxResponse = null;
            isDialog: boolean                            = false;
            
            // endregion
            
            formIsNotValidAlert(): void {
                if (this.toastValidationIsReady) {
                    this.toastValidationIsReady = false;
                    
                    const notificationPopups: DialogClass.Popups = new DialogClass.Popups();
                    notificationPopups.onToast({
                        Title      : 'Error',
                        Description: 'Validation issue.',
                        Color      : DialogEnum.DialogColorTypes.WARNING,
                        
                    }).then(response => {
                        this.toastValidationIsReady = true;
                    });
                }
            }
            
            formSuccess(): void {
                
                const notificationPopups: DialogClass.Popups = new DialogClass.Popups();
                notificationPopups.onToast({
                    Title      : 'Success',
                    Description: 'Data has been saved successfully.',
                    Color      : DialogEnum.DialogColorTypes.SUCCESS,
                });
            }
            
            ngOnDestroy(): void {
                this.subscriptions.forEach(sub => sub.unsubscribe());
            }
            
        } // class Container
        
    } // namespace Class
    
    export namespace Enum {
    
    } // namespace Class
    
} // namespace LayoutAbstraction


export namespace LayoutCommon {
    
    export namespace Interface {
        
        export interface IContainerInput<T> {
            Mode: 'edit' | 'create';
            ContainerInputData: T;
        }
    } // namespace Interface
    
    export namespace Class {
        
        export class ContainerInput<T> implements LayoutCommon.Interface.IContainerInput<T> {
            public Mode: 'edit' | 'create' = null;
            public ContainerInputData: T;
            
            constructor(_Mode: 'edit' | 'create', _ContainerInputData: T,) {
                this.Mode               = _Mode;
                this.ContainerInputData = _ContainerInputData;
            }
        }
        
    } // namespace Class
    
}
