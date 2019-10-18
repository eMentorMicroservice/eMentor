import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { throwError } from 'rxjs';
import { NotificationService } from '../notify.service';
import { NotifyType } from 'src/app/models/enums';

/**
 * Default error handler
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router,
    private notifyService: NotificationService
  ) {
  }

  /**
   * Handle error function
   * @param {Response} error
   * @return {any}
   */
  public handleError(error: HttpErrorResponse): any {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else {
      let message = '';
      if (error.error && error.error.error) {
        if (error.error.error.innerError) {
          message = error.error.error.innerError
        } else if (error.error.error.message) {
          message = error.error.error.message;
        }
        this.notifyService.notify(message, NotifyType.Error);
      }
    }
    return throwError(error);
  }
}
