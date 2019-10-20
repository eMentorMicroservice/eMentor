import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms'

@Directive({
    selector: '[min][formControlName],[min][formControl],[min][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinValidator, multi: true }]
})
export class MinValidator implements Validator {

    constructor() { }
    @Input('min') value: number;

    validate(control: AbstractControl): { [key: string]: any } {


        let controlValue: string = control.value == null ? null : control.value.toString();

        if (controlValue != null && controlValue != "") {

            if (Number(controlValue) < this.value) {
                return { "min": true };
            }
            return null;
        }
        return null;
    }

}
