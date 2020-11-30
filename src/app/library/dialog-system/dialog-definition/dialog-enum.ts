export namespace DialogEnum {
    
    export enum DialogColorTypes { // razmisliti o imenovanju
        NONE     = 0,
        STANDARD = 1, // Default
        SUCCESS  = 2,
        INFO     = 3,
        WARNING  = 4,
        DANGER   = 5
    } // enum DialogColorTypes
    
    export enum ButtonColorTypes {
        NONE      = 0,
        PRIMARY   = 1,
        SUCCESS   = 2,
        INFO      = 3,
        WARNING   = 4,
        DANGER    = 5,
        BASIC     = 6,
        DARK      = 7,
        LIGHT     = 8,
        LINK      = 9,
        SECONDARY = 10
        
    } // enum DialogColorTypes
    
    export type ButtonUniqueTypes = 'cancel' | 'create' | 'edit' | 'set' | 'apply-default';
    
    
}
