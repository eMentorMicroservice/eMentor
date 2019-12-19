import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DialogModel } from 'src/app/models/dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  bodyHTML = document.getElementById('body');
  @Input() model: DialogModel;
  constructor(public bsModalRef: BsModalRef, private modal: BsModalService) { }

  ngOnInit() {
  }

  yesBtnClicked() {
    this.modal.hide(this.modal.getModalsCount());
    if(this.model.mainActionButton != null) {
      this.model.mainActionButton.call(this);
    }
  }
  noBtnClicked() {
    this.modal.hide(this.modal.getModalsCount());
    if(this.model.subActionButton != null) {
      this.model.subActionButton.call(this);
    }
  }
  closeModal() {
    if (this.model.closeButton != null) {
      this.model.closeButton.call(this);
    } else {
      this.bodyHTML.classList.remove('modal-open');
      this.modal.hide(this.modal.getModalsCount());
    }
  }
}
