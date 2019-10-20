import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[phone][formControlName],[phone][formControl],[phone][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => PhoneValidator),
        multi: true
    }]
})

export class PhoneValidator implements Validator {
    constructor() { }

    validate(c: AbstractControl): { [key: string]: any } {        
     const regex = RegExp('^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$');
        if (regex.test(c.value)) {
            return null;
        }
        return {
            phone: false
        };

    }
}
