import { Directive, OnInit, OnDestroy, Input, ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { AbstractControl, ControlContainer, NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[invalidmessage]'
})
export class InvalidmessageDirective implements OnInit, OnDestroy {
  @Input('invalidmessage') invalidmessage: string;
  @Input('title') title: string;
  control: AbstractControl;
  hasView = false;
  controlValue$: Observable<any>;
  controlSubscription: Subscription;
  hasSubmitted: boolean;
  onReady = new EventEmitter<void>();
  constructor(
    private _fg: ControlContainer,
    private _el: ElementRef,
    private render: Renderer2
  ) { }

  ngOnInit() {
    const tmp = this.form.valueChanges.subscribe(p => {
      if (p.hasOwnProperty(this.invalidmessage)) {
        this.control = this.form.get(this.invalidmessage);
        const formSubmit$ = (this._fg.formDirective as NgForm).ngSubmit.map(() => {
          this.hasSubmitted = true;
        });
        this.controlValue$ = Observable.merge(this.control.valueChanges, Observable.of(''), formSubmit$);
        this.controlSubscription = this.controlValue$.subscribe(() => {
          this.setVisible();
        });
        tmp.unsubscribe();
        this.onReady.emit();
      }
    });
  }

  private setVisible() {
    if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
      this.render.removeStyle(this._el.nativeElement, 'display');
    } else {
      this.render.setStyle(this._el.nativeElement, 'display', 'none');
    }
  }

  match(error: string) {
    if (this.control && this.control.errors) {
      if (Object.keys(this.control.errors).indexOf(error) > -1) {
        return true;
      }
    }
    return false;
  }

  get form() {
    return this._fg.formDirective ? (this._fg.formDirective as NgForm).form : undefined;
  }

  ngOnDestroy() {
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }
}
