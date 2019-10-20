import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms'

@Directive({
    selector: '[max][formControlName],[max][formControl],[max][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxValidator, multi: true }]
})
export class MaxValidator implements Validator {

    constructor() { }
    @Input('max') value: number;

    validate(control: AbstractControl): { [key: string]: any } {


        let controlValue: string = control.value == null ? null : control.value.toString();

        if (controlValue != null && controlValue != "") {

            if (Number(controlValue) > this.value) {
                return { "max": true };
            }
            return null;
        }
        return null;
    }

}
