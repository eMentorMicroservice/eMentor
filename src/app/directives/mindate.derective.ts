import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms'

@Directive({
    selector: '[mindate][formControlName],[mindate][formControl],[mindate][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => MinDateValidator),
        multi: true
    }]
})
export class MinDateValidator implements Validator {

    constructor() { }

    validate(control: AbstractControl): { [key: string]: any } {

        if (control.value) {
            if (Date.parse(control.value) > Date.now()) {
                return { mindate: false };
            }
            return null;
        }
        return null;
    }

}
