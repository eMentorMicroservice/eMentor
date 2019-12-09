import { Component, Input, forwardRef, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatePickerComponent),
    multi: true
  }]
})

export class AppDatePickerComponent implements ControlValueAccessor {
  value: any;
  @Input() title: string;
  @Input() placeholder = '';
  @Input() required: boolean;
  @Input() bsConfig: Partial<BsDatepickerConfig>;
  @Input() type = 'text';
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  onChange: (_: any) => void = (_: any) => { };
    onTouched: () => void = () => { };
    @Output() bsValueChange: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() private ngForm: NgForm
  ) {
  }

  preventEvent(event) {
    event.stopPropagation();
  }

  writeValue(value: any): void {
    if (value !== this.value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateChanges() {
    this.onChange(this.value);
  }

  invalid() {
    if (!this.ngForm) {
      return false;
    }

    const control = this.ngForm.form.get(this.name);
    return control && control.invalid && (control.dirty || this.ngForm.submitted);
  }

  valid() {
    if (!this.ngForm) {
      return false;
    }

    const control = this.ngForm.form.get(this.name);
    return control && control.valid && (control.dirty || this.ngForm.submitted);
    }

    onValueChange(value) {
        if (value != null) {
            this.bsValueChange.emit(value);
        }
    }

}
