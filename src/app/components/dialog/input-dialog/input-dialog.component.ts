import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { DialogModel } from 'src/app/models/dialog.model';

@Component({
  selector: 'app-confirm-dialog-input',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {
  autoComplete = 'off';
  tempValue = '';
  isPaswordBox = false;
  saveBtnClicking: (content: string) => void;
  cancelBtnClicking: () => void;
  model: DialogModel;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    // tslint:disable-next-line: triple-equals
    if (this.model.typeOfInput == 'password') {
      this.model.typeOfInput = 'text';
      this.isPaswordBox = true;
    }
  }

  textChanged(event) {

    if (!this.isPaswordBox) {
      return;
    }

    const len = this.model.content.length;
    const char = '•';
    let mask = '';

    for (let i = 0; i < len; i++) { mask += char; }

    const oldLength = this.tempValue.length;

    if (oldLength > mask.length) {

      const rate = oldLength - mask.length;
      const endIndex = oldLength - 1;
      const startIndex = endIndex - rate;

      this.tempValue = this.tempValue.substring(0, startIndex + 1);
    } else {

      this.model.content.split('').forEach(element => {
        if (element != '•') {
          this.tempValue += element;
        }
      });

    }

    this.model.content = mask;
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.bsModalRef.hide();

    if (this.model.mainActionButton != null) {

      if (this.isPaswordBox) {
        this.model.mainActionButton.call(this, this.tempValue);
      } else {
        this.model.mainActionButton.call(this, this.model.content);
      }
    }
  }

  noBtnClicked() {
    this.bsModalRef.hide();
    if (this.model.subActionButton != null) {
      this.model.subActionButton.call(this);
    }
  }
}
