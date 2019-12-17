import { Component, OnInit, HostBinding, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('emptyfull', [
      // ...
      state('empty', style({
        width: '0%'
      })),
      state('full', style({
        width: '100%'
      })),
      transition('empty => full', [
        animate('1.3s')
      ]),
      transition('full => empty', [
        animate('0s')
      ]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isFull = false;
  dialogSubscribe: Subscription;
  nativeMethod: any;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {


  }

  ngOnDestroy(): void {
    this.dialogSubscribe.unsubscribe();
  }

  navigationStarted() {
    if (!this.isFull) {
      this.isFull = true;
    }
  }

  navigationEnded() {
    // tslint:disable-next-line: comment-format
    //this.isFull = false
  }

  navigationCanceled() {

  }

  navigationRecognized() {
  }


  animationDone(event) {
    if (this.isFull) {
      this.isFull = false;
    }
  }
}
