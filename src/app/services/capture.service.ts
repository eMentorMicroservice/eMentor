import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptureService {

  constructor() { }

  video(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
  }

  screen(): Promise<MediaStream>{
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
