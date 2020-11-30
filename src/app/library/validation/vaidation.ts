export namespace LibraryValidation {
    
    export namespace Interface {
    
    } // namespace Interface
    
    export namespace Class {
        
        export class StringValidation {
            
            private LettersRegexp: RegExp  = /^[A-Za-z]+$/;
            private PasswordRegexp: RegExp = /^(?=.*[0-9])(?=.*[+\-!#$])[a-zA-Z0-9+\-!#$]{6,}$/;
            private EmailRegexp: RegExp    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            public length = (_MinLength: number, _MaxLength: number) => (_String: string): boolean => {
                return (typeof _String === 'string') && _String.length >= _MinLength && _String.length <= _MaxLength;
            };
            
            public startsWith = (_StartWith: string, _StartPosition: number = 0) => (_String: string): boolean => {
                return (typeof _String === 'string') && _String.startsWith(_StartWith, _StartPosition);
            };
            
            public isString = () => (_Number: number): boolean => {
                return (typeof _Number === 'string');
            };
            
            public email = (_Regexp: RegExp = null) => (_String: string): boolean => {
                if (!_String) {
                    return false;
                }
                const regexp = _Regexp ? _Regexp : this.EmailRegexp;
                return regexp.test(_String.toLowerCase());
            };
            
            public password = (_Regexp: RegExp = null) => (_String: string): boolean => {
                if (!_String) {
                    return false;
                }
                const regexp = _Regexp ? _Regexp : this.PasswordRegexp;
                return regexp.test(_String.toLowerCase());
            };
            
            lettersValidation(_Input: string): boolean {
                return this.LettersRegexp.test(_Input);
            }
        }
        
        export class NumberValidation {
            
            private NumberRegexp: RegExp = /^[0-9]+$/;
            
            public length = (_MinLength: number, _MaxLength: number) => (_Number: string): boolean => {
                return (typeof _Number === 'number') && _Number >= _MinLength && _Number <= _MaxLength;
            };
            
            public isNumber = () => (_Number: number): boolean => {
                return (typeof _Number === 'number');
            };
            
            numbersValidation(_Input: number): boolean {
                return this.NumberRegexp.test(String(_Input));
            }
        }
        
        
    } // namespace Class
    
} // namespace LibraryValidation
