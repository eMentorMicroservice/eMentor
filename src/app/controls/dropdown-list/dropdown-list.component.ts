import { Component, Input, forwardRef, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { DropdownModel } from '../../models/dropdown.model';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppDropdownListComponent),
    multi: true
  }]
})

export class AppDropdownListComponent implements ControlValueAccessor {
  value: any;
  @Input() title: string;
  @Input() placeholder = '';
  @Input() required: boolean;
  @Input() type = 'text';
  @Input() name: string;
  @Input() disabled: boolean;
  dataValue: DropdownModel[];
  @Input() defaultValue: any;
  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };

  constructor(
    @Optional() private ngForm: NgForm
  ) {
  }

  get data(): DropdownModel[] {
    return this.dataValue;
  }

  @Input() set data(value: DropdownModel[]) {

    // tslint:disable-next-line: triple-equals
    if (value != this.dataValue) {
      this.dataValue = value;
      if (!this.defaultValue) {
        return;
      }
      // tslint:disable-next-line: triple-equals
      if (this.dataValue.length && (this.value == null || this.value == undefined)) {
        this.value = this.defaultValue;
        this.updateChanges();
      }
    }
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

}
