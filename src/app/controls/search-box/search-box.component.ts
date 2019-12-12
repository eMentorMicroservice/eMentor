import { Component, Input, forwardRef, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchBoxComponent),
    multi: true
  }]
})

export class SearchBoxComponent implements ControlValueAccessor, OnInit {
  value: any;
  @Input() placeholder = '';
  @Input() delayTimeSpan = 1000;
  @Output() searchTextInvoke = new EventEmitter();

  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };

  // tslint:disable-next-line: member-ordering
  searchContent = new FormControl();
  // tslint:disable-next-line: member-ordering
  searchForm: FormGroup = this.formBuilder.group({
    searchContent: this.searchContent
  });

  constructor(private formBuilder: FormBuilder,    @Optional() private ngForm: NgForm  ) {
  }

  ngOnInit(): void {
    this.searchContent.valueChanges.pipe(
      debounceTime(this.delayTimeSpan),
      tap()
    ).subscribe(res => {
      this.searchTextInvoke.emit(res);
    });
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
}
