import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class GlobalService {
  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  signalRClientLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private countLoading = 0;

  constructor(
    protected http: HttpClient) { }

  loading() {
    this.countLoading++;
    this.loader.next(!!this.countLoading);
  }

  loaded() {
    this.countLoading--;
    this.loader.next(!!this.countLoading);
  }

  signalRClientInitDone() {
    this.signalRClientLoader.next(true);
  }




}