import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptureVideoService {

  constructor() { }
  capture(): Promise<MediaStream>{
    let nav = <any>navigator;
    if (nav.getDisplayMedia) {
      return nav.getDisplayMedia({video: true});
    } else if (nav.mediaDevices.getDisplayMedia) {
      return nav.mediaDevices.getDisplayMedia({video: true});
    } else {
      return nav.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}});
    }
  }
}
