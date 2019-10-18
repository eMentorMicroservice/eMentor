import { Component, OnInit, forwardRef, Input, EventEmitter, Output, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './app-text-box.component.html',
  styleUrls: ['./app-text-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppTextBoxComponent),
    multi: true
  }]
})
export class AppTextBoxComponent implements ControlValueAccessor {

  value: any;
  @Input() title: string;
  @Input() placeholder = '';
  @Input() required: boolean;
  @Input() type = 'text';
  @Input() name: string;
  @Input() disabled: boolean;
  @Output() textChangeInvoke = new EventEmitter();

  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };

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
    this.textChangeInvoke.emit();
  }

  invalid() {
    if (!this.ngForm) {
      return false;
    }
    const control = this.ngForm.form.get(this.name);
    return control && control.invalid && (control.dirty || this.ngForm.submitted);
  }

  removeZero(e, value: any) {
    if (this.type === "number") {
      if (value == 0) {
        this.value = '';
      }
    }
  }

  addZero(e, value: any) {
    if (this.type === "number") {
      if (value == '') {
        this.value = 0;
      }
    }
  }

  valid() {
    if (!this.ngForm) {
      return false;
    }

    const control = this.ngForm.form.get(this.name);
    return control && control.valid && (control.dirty || this.ngForm.submitted);
  }
}
