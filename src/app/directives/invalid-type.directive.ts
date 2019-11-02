import {Directive, OnInit, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {InvalidmessageDirective} from './invalid-message.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[invalidType]'
})
export class InvalidTypeDirective implements OnInit {

  @Input('invalidType') invalidType: string;
  private hasView = false;
  constructor(
    private invalidmessage: InvalidmessageDirective,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.invalidmessage.onReady.subscribe(() => {
      this.invalidmessage.controlValue$.subscribe(() => {
        this.setVisible();
      });
      this.invalidmessage.onReady.unsubscribe();
    });
  }

  private setVisible() {
    if (this.invalidmessage.match(this.invalidType)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }
}
