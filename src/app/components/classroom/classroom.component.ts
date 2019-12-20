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
import 'webrtc-adapter';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';

const JOIN_ROOM = 'JOIN_ROOM';
const EXCHANGE = 'EXCHANGE';
const REMOVE_USER = 'REMOVE_USER';
@Component({
  selector: 'app-classroom',
  viewProviders: [CanvasWhiteboardComponent],
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
  pcPeers = {};
  isShowWhiteBoard = true;


  currentUser: number;
  room: number;


  constructor(
    private capture: CaptureService,
    private cableService: ActionCableService,
    private http: HttpClient,
    protected errorHandler: ErrorService,
  ) { }

  ngOnInit() {
    this.currentUser = LocalService.getUserId();
    this.getRoom(this.currentUser);
    this.remoteVideo = <HTMLVideoElement>document.querySelector('#remote-video');
    this.localVideo = <HTMLVideoElement>document.querySelector('#local-video');
    this.capture.video().then(stream => {
      this.localStream = stream;
      this.localVideo.srcObject = stream;
      this.remoteStream = new MediaStream();
      this.startConnection();
    });
  }

  getRoom(id: number) {
    this.http.get<any>('http://localhost:3000/rooms/find',
      {
        params: {
          user_id: id.toString()
        }
      }
    ).subscribe(data => {
      this.room = Number(data.room_id);
    });
  }

  startConnection() {
    this.channel = this.cableService.cable('ws://localhost:3000/cable').channel('ClassroomChannel', {room_id: this.room});
    console.log('current user', this.currentUser);
    this.channel.connected().subscribe(() => {
      this.broadcastData({
        type: JOIN_ROOM,
        from: this.currentUser
      });
    });
    this.channel.received().subscribe(resp => {
      const data = resp.data;
      // tslint:disable-next-line: triple-equals
      if (resp.type == 'INFO') {
        this.handelStreamInfo(data);
      } else {
        this.handelMessage(data);
      }
    });
  }
  handelStreamInfo = (data: any) => {
    // tslint:disable-next-line: triple-equals
    if (data.from != this.currentUser) {
      switch (data.type) {
        case JOIN_ROOM:
          return this.createPC(data.from, true);
        case EXCHANGE:
          if (data.to !== this.currentUser) { return; }
          return this.exchange(data);
        default:
          return;
      }
    }
  }

  handelMessage = (data: any) => {
    console.log(data);
  }

  broadcastData = (data: Object) => {
    const localData = {room_id: this.room, type: 'INFO', info: data};
    this.http.post('http://localhost:3000/rooms/send_info', JSON.stringify(localData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe();
  }

  createPC = (userId, isOffer) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {urls : 'stun:stun1.l.google.com:19302'},

      ]
    });
    this.pcPeers[userId] = pc;
    this.localStream.getTracks().forEach(track => {
      pc.addTrack(track);
    });

    // tslint:disable-next-line: no-unused-expression
    isOffer &&
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer).then(() => {
          console.log('offer', offer);
          this.broadcastData({
            type: EXCHANGE,
            from: this.currentUser,
            to: userId,
            sdp: JSON.stringify(pc.localDescription)
          });
        });
      });
    pc.onicecandidate = event => {
      // tslint:disable-next-line: no-unused-expression
      event.candidate &&
        this.broadcastData({
          type: EXCHANGE,
          from: this.currentUser,
          to: userId,
          candidate: JSON.stringify(event.candidate)
        });
    };
    pc.ontrack = event => {
      this.remoteStream.addTrack(event.track);
      this.remoteVideo.srcObject = this.remoteStream;
      console.log('ontrack');
    };

    return pc;
  }

  exchange(data) {
    let pc: RTCPeerConnection;
    if (!this.pcPeers[data.from]) {
      pc = this.createPC(data.from, false);
    } else {
      pc = this.pcPeers[data.from];
    }
    if (data.sdp) {
      const sdp = JSON.parse(data.sdp);
      pc
        .setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => {
          if (sdp.type === 'offer') {
            console.log('remote', pc.remoteDescription);
            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer).then(() => {
                this.broadcastData({
                  type: EXCHANGE,
                  from: this.currentUser,
                  to: data.from,
                  sdp: JSON.stringify(pc.localDescription)
                });
              });
            });
          }
        });
    }
    if (data.candidate) {
      pc
        .addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
        .then(() => console.log('ice cadidate added'));
    }
  }

  setup() {
    this.capture.video().then(stream => {

      this.localStream = stream;
      this.localVideo.srcObject = this.localStream;
    });
  }

  stopVideo() {
    this.tracks.forEach(track => {
      track.stop();
    });

    this.video.srcObject = null;
  }




}
