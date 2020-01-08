import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditcard.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notify.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { LocalService } from 'src/app/services/common/local.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  ccard = new CreditCard();
  spinner_mes = "Checking ....";
  teacher_id = 0;
  channel: Channel;
  current_user: number;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private notifyService: NotificationService,
    private active_router: ActivatedRoute,
    private router: Router,
    private cableService: ActionCableService,
  ) { }

  ngOnInit() {
    this.active_router.queryParams.subscribe(params => {
      if (params['teacher_id']) {
        this.teacher_id = params['teacher_id']
      }
    })
    this.current_user = LocalService.getUserId();
  }

  onSubmit() {
    let data = {card_number: this.ccard.number}
    this.spinner.show();
    this.http.post<any>('http://localhost:3010/user_cards/validate_card', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(resp => {
      if (resp.status == 200) {
        //this.spinner.hide();
        this.notifyService.success('Checkout complete !')
        this.spinner_mes = " Waiting for tutor's respone..."
        if (this.teacher_id > 0) {
          this.offerTutor();
        }
      } else {
        this.spinner.hide();
        this.ccard.number = '';
        this.notifyService.error(resp.error);
      }
    })
  }

  offerTutor() {
    this.channel = this.cableService.cable('ws://localhost:3000/cable').channel('NotifyChannel', {user_id: this.current_user});
    this.channel.connected().subscribe(() => {
      this.sendOffer();
    })
    this.channel.received().subscribe(data => {
      if (data.type == "ANSWER") {
        if (data.message == "ACCEPTED") {
          this.router.navigate(['/classroom'], {queryParams: {teacher_id: this.teacher_id}});
        } else {
          this.notifyService.error("This tutor do not acccept your offer!");
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000)
        }
      }
    })
  }

  sendOffer(){
    let data = {from: this.current_user, to: this.teacher_id}
    console.log('sendoffer', data)
    this.http.post('http://localhost:3000/notify/send_offer', JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe();
  }
  broadcastData(user_id, message) {

  }

}
