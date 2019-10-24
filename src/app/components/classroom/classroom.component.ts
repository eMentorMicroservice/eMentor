import { Component, OnInit } from '@angular/core';
import { CaptureService} from 'src/app/services/capture.service';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  video: HTMLVideoElement;
  tracks: MediaStreamTrack[];

  constructor(
    private capture: CaptureService,
  ) { }

  ngOnInit() {
    
    // this.setup();
  }

  setup() {
    this.capture.video().then(stream => {
      this.video = <HTMLVideoElement>document.querySelector('#targetVideo');
      this.video.srcObject = stream;
      this.tracks = stream.getTracks();
    })
  }

  stopVideo() {
    this.tracks.forEach(track => {
      track.stop();
    })

    this.video.srcObject = null;
  }



  
}
