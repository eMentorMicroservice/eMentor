import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { CreditCardModel } from '../models/credit_card.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = "http://localhost:3010"


constructor(private http: HttpClient) {}

  validateCard(card: CreditCardModel): Observable<any> {
    return this.http.post(this.url, card);
  }
}
