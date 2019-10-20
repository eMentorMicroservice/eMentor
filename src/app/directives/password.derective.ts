import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[password][formControlName],[password][formControl],[password][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => PasswordValidator),
        multi: true
    }]
})

export class PasswordValidator implements Validator {
    constructor() { }

    validate(c: AbstractControl): { [key: string]: any } {
        const regex = RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$');
        if (regex.test(c.value)) {
            return null;
        }
        return {
            password: false
        };

    }
}
