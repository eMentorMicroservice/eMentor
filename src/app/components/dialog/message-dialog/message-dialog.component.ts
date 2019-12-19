import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { DialogModel } from 'src/app/models/dialog.model';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  model: DialogModel;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  btnClicked() {
    this.bsModalRef.hide();
    if (this.model.mainActionButton != null) {
      this.model.mainActionButton.call(this);
    }
  }

}
