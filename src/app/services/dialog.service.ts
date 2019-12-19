import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { BehaviorSubject } from 'rxjs';
import { DialogModel } from '../models/dialog.model';

declare function messageDialogOpening(title, message, okBtntext, okCallback?: () => void): any;
declare function confirmDialogOpening(title, message, okBtntext, cancelBtnText, okCallback: () => void, cancelCallback: () => void): any;
// tslint:disable-next-line: max-line-length
declare function inputDialogOpening(title, content, typeOfInput, okCallback: (result) => void, cancelCallback: () => void, okBtnText, cancelBtnText);

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  modalBevavior: BehaviorSubject<DialogModel> = new BehaviorSubject<DialogModel>(null);
  constructor() {
  }

  confirm(title: string, content: string, confirmBtn?: () => void, cancelBtn?: () => void, confirmBtnText = 'Yes', cancelBtnText = 'No') {
    confirmDialogOpening(title, content, confirmBtnText, cancelBtnText, confirmBtn, cancelBtn);
  }

  message(title: string, content: string, okBtn?: () => void, okBtnText = 'OK') {
    messageDialogOpening(title, content, okBtnText, okBtn);
  }

  // tslint:disable-next-line: max-line-length
  input(title: string, content: string, hint: string, typeOfInput: string, okBtn?: (content: string) => void, cancelBtn?: () => void, okBtnText = 'OK', cancelBtnText = 'Cancel') {
    inputDialogOpening(title, content, typeOfInput, okBtn, cancelBtn, okBtnText, cancelBtnText);
  }
}

