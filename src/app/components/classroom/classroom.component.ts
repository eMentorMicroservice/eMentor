import { Component, OnInit } from '@angular/core';
import { CaptureService} from 'src/app/services/capture.service';
import { ActionCableService, Channel } from 'angular2-actioncable';
import { LOCAL_STORAGE_VARIABLE } from 'src/app/app.constants';
import { LocalService } from 'src/app/services/common/local.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { shareReplay, timeout, catchError } from 'rxjs/operators';
import { API_HOST, API_URL_PREFIX, REQUEST_TIMEOUT } from '../../app.constants';
import { ErrorService } from 'src/app/services/common/error.service';
import "webrtc-adapter";

const JOIN_ROOM = "JOIN_ROOM";
const EXCHANGE = "EXCHANGE";
const REMOVE_USER = "REMOVE_USER";
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  video: HTMLVideoElement;
  remoteVideo: HTMLVideoElement;
  localVideo: HTMLVideoElement;
  tracks: MediaStreamTrack[];
  
  subscription: Subscription;
  channel: Channel;
  header: HttpHeaders;
  params: HttpParams;
  testOP: JSON;
  testS: Number;
  localStream: MediaStream;
  remoteStream: MediaStream;

  


  constructor(
    private capture: CaptureService,
    private cableService: ActionCableService,
    private http: HttpClient,
    protected errorHandler: ErrorService,
  ) { }

  ngOnInit() {
    this.remoteVideo = <HTMLVideoElement>document.querySelector('#remote-video');
    this.localVideo = <HTMLVideoElement>document.querySelector('#local-video');
  }

  startConnection() {
    this.channel = this.cableService.cable('ws://localhost:3000/cable').channel('ClassroomChannel', {room_id: 1});
    this.subscription = this.channel.received().subscribe(message => {
      this.testOP = message;
      this.testS = message.test;
    })
  }

  broadcastData = data => {
    this.http.post('http://localhost:3000/classroom', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  createPC = (userId, isOffer) => {
    const ice = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    let pc = new RTCPeerConnection(ice);
    this.localStream.getTracks().forEach(track => {
      pc.addTrack(track);
    })
    pc.createOffer().then(offer => {
      pc.setLocalDescription(offer);
      this.broadcastData({
        sdp: JSON.stringify(pc.localDescription)
      })
    })
    pc.onicecandidate = event => {
      event.candidate &&
        this.broadcastData({
          type: EXCHANGE,
          to: userId,
          candidate: JSON.stringify(event.candidate)
        });
    }
    pc.ontrack = event => {
      this.remoteStream.addTrack(event.track)
    }

    return pc;
  }

  

  sendMessage() {
    var con = JSON.parse('{"room_id": "1", "message": "1"}');
    this.http.post('http://localhost:3000/classroom', con, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(res => {
      this.channel.received().subscribe(message => {
        this.testOP = message;
        this.testS += message
      })
    })
  }

  setup() {
    this.capture.video().then(stream => {
      this.video = <HTMLVideoElement>document.querySelector('#local-video');
      this.video.srcObject = stream;
      this.tracks = stream.getTracks();
      this.localStream = stream;
    })
  }

  

  stopVideo() {
    this.tracks.forEach(track => {
      track.stop();
    })

    this.video.srcObject = null;
  }



  
}
