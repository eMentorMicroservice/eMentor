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
  pcPeers = {};


  currentUser: number;
  


  constructor(
    private capture: CaptureService,
    private cableService: ActionCableService,
    private http: HttpClient,
    protected errorHandler: ErrorService,
  ) { }

  ngOnInit() {
    this.remoteVideo = <HTMLVideoElement>document.querySelector('#remote-video');
    this.localVideo = <HTMLVideoElement>document.querySelector('#local-video');
    this.currentUser = Math.floor(Math.random() * 100);
    this.capture.video().then(stream => {
      this.localStream = stream;
      this.localVideo.srcObject = stream;
      this.remoteStream = new MediaStream();
      this.startConnection();
    })
  }

  startConnection() {
    this.channel = this.cableService.cable('ws://localhost:3000/cable').channel('ClassroomChannel', {room_id: 1});
    console.log('current user', this.currentUser)
    this.channel.connected().subscribe(() => {
      this.broadcastData({
        type: JOIN_ROOM,
        from: this.currentUser
      })
    })
    this.channel.received().subscribe(data => {
      console.log("recevice", data);
      if (data.from === this.currentUser) return;
      switch (data.type) {
        case JOIN_ROOM:
          return this.createPC(data.from, true);
        case EXCHANGE:
          if (data.to !== this.currentUser) return;
          return this.exchange(data);
        default:
          return;
      }
    })
    
  }

  broadcastData = (data: Object) => {
    let room = {room_id: 1};
    let localData = Object.assign(room, data);
    this.http.post('http://localhost:3000/classroom', JSON.stringify(localData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe();
  }

  createPC = (userId, isOffer) => {
    let pc = new RTCPeerConnection({
      iceServers: [
        {urls :'stun:stun1.l.google.com:19302'},
        
      ]
    });
    this.pcPeers[userId] = pc;
    this.localStream.getTracks().forEach(track => {
      pc.addTrack(track);
    })

    isOffer && 
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer).then(() => {
          console.log('offer', offer)
          this.broadcastData({
            type: EXCHANGE,
            from: this.currentUser,
            to: userId,
            sdp: JSON.stringify(pc.localDescription)
          })
        });
      })
    pc.onicecandidate = event => {
      event.candidate &&
        this.broadcastData({
          type: EXCHANGE,
          from: this.currentUser,
          to: userId,
          candidate: JSON.stringify(event.candidate)
        });
    }
    pc.ontrack = event => {
      this.remoteStream.addTrack(event.track);
      this.remoteVideo.srcObject = this.remoteStream;
      console.log('ontrack');
    }

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
      let sdp = JSON.parse(data.sdp);
      pc
        .setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => {
          if (sdp.type === "offer") {
            console.log('remote', pc.remoteDescription)
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
        })
    }
    if (data.candidate) {
      pc
        .addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
        .then(() => console.log("ice cadidate added"))
    }
  }

  sendMessage() {
    var con = JSON.stringify({"room_id": "1", "message": "1"});
    this.http.post('http://localhost:3000/classroom', con).subscribe(res => {
      this.channel.received().subscribe(message => {
        this.testOP = message;
        this.testS += message
      })
    })
  }

  setup() {
    this.capture.video().then(stream => {
      
      this.localStream = stream;
      this.localVideo.srcObject = this.localStream;
    })
  }

  stopVideo() {
    this.tracks.forEach(track => {
      track.stop();
    })

    this.video.srcObject = null;
  }



  
}
