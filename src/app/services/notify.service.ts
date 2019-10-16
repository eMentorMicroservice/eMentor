import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SERVER_ERROR_MESSAGES } from '../app.constants';
import { NotifyType } from '../models/enums';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class NotificationService {

  alertSetup: any;
  notifySetup: any;

  constructor(private toastr: ToastrService) {
    this.alertSetup = { timeOut: 3000, progressBar: true, progressAnimation: "decreasing", };
    this.notifySetup = { timeOut: 15000, tapToDismiss: true, progressBar: false, progressAnimation: "decreasing", positionClass: "toast-bottom-right", closeButton: true, extendedTimeOut: 3000 };
  }

  pushServerToast(content: string, title: string = '', toastContentClicked?: () => void, cancelToast?: () => void) {
    if (title == '')
      title = "Thông Báo Mới.";

    var toast = this.toastr.info(content, title, this.notifySetup);
    let isClicked = false;
    toast.onTap
      .subscribe(() => {
        isClicked = true;
        if (toastContentClicked != null)
          toastContentClicked.call(this);
      });

    toast
      .onHidden
      .subscribe(() => {
        if (!isClicked) {
          if (cancelToast != null)
            cancelToast.call(this);
        }
      });

  }


  error(content: string) {
    this.toastr.error(content, "Lỗi!!", this.alertSetup);
  }

  success(content: string) {
    this.toastr.success(content, "Thành Công!!", this.alertSetup);
  }

  info(content: string) {
    this.toastr.info(content, "Thông Tin", this.alertSetup);
  }

  warning(content: string) {
    this.toastr.warning(content, "Cảnh Báo", this.alertSetup);
  }

  serverError(data: any) {
    this.notify(data.error.error.message);
  }

  notify(message: string, type: NotifyType = NotifyType.Error) {

    let content;

    let errorModel = SERVER_ERROR_MESSAGES.filter((p: { Key: string; }) => p.Key == message)[0];
    if (errorModel)
      content = errorModel.Value;
    else
      content = message;

    switch (type) {
      case NotifyType.Error:
        this.error(content);
        break;
      case NotifyType.Info:
        this.info(content);
        break;
      case NotifyType.Success:
        this.success(content);
        break;
      case NotifyType.Warning:
        this.warning(content);
        break;
    }

  }
}
