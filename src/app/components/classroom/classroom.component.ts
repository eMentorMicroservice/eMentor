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
import { CanvasWhiteboardComponent, CanvasWhiteboardService, CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import {ActivatedRoute} from '@angular/router';

const JOIN_ROOM = 'JOIN_ROOM';
const EXCHANGE = 'EXCHANGE';

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
  avatar: any;
  fullName: any;
  currentUser: number;
  room: number;
  messages = [];
  user_message: string;
  users = {};


  constructor(
    private capture: CaptureService,
    private cableService: ActionCableService,
    private http: HttpClient,
    protected errorHandler: ErrorService,
    private userService: UserService,
    private canvasService: CanvasWhiteboardService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentUser = LocalService.getUserId();
    this.handleQuery();
    this.remoteVideo = <HTMLVideoElement>document.querySelector('#remote-video');
    this.localVideo = <HTMLVideoElement>document.querySelector('#local-video');
    this.capture.video().then(stream => {
      this.localStream = stream;
      this.localVideo.srcObject = stream;
      this.remoteStream = new MediaStream();
      this.startConnection();
    });
    this.userService.getUserProfile().subscribe(data => {
      this.avatar = data.avatar;
      this.fullName = data.fullName;
      this.users[this.currentUser] = {avatar: this.avatar, name: this.fullName};
    })
    this.avatar = LocalService.getUserAvt();
    this.fullName = LocalService.getUserName();
    this.users[LocalService.getUserId()] = {avatar: LocalService.getUserAvt(), name: LocalService.getUserName()};
    
  }

  handleQuery() {
    this.router.queryParams.subscribe(params => {
      if (params['teacher_id']) {
        this.http.post<any>('http://localhost:3000/rooms', 
          {
            user_id: this.currentUser, 
            teacher_id: params['teacher_id']
          }, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }).subscribe(data => {
            this.room = data.room;
          })
      } else {
        this.getRoom(this.currentUser);
      }
    })
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
      switch (resp.type) {
        case 'INFO':
          this.handleStreamInfo(data);
          break;
        case 'MESSAGE':
          this.handleMessage(data);
          break;
        case 'DRAW':
          this.handleDraw(data);
          break;
      }
    });
  }

  //Canvas whiteboard
  handleDraw(data: any) {
    switch (data.type) {
      case 'UPDATE':
        let pre_updates = JSON.parse(data.updates);
        let updates = pre_updates.map(updateJSON => CanvasWhiteboardUpdate.deserializeJson(JSON.stringify(updateJSON)));
        this.canvasService.drawCanvas(updates);
        break;
      case 'CLEAR':
        this.canvasService.clearCanvas();
        break;
      case 'UNDO':
        //console.log('undo', data.uuid)
        this.canvasService.undoCanvas(data.uuid.toString());
        break;
      case 'REDO':
        this.canvasService.redoCanvas(data.uuid.toString());
        break;
    }
  }

  broadcastDraw(data) {
    const localData = {room_id: this.room, data: data};
    this.http.post('http://localhost:3000/rooms/send_draw', JSON.stringify(localData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe();
  }


  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    // console.log('update', JSON.stringify(updates))
    let data = {type: 'UPDATE', updates: JSON.stringify(updates)};
    this.broadcastDraw(data);
  }
  onCanvasClear() {
    let data = {type: 'CLEAR'};
    this.broadcastDraw(data);
  }
  onCanvasUndo(updateUUID: string) {
    let data = {type: 'UNDO', uuid: updateUUID};
    this.broadcastDraw(data);
  }
  onCanvasRedo(updateUUID: string) {
    let data = {type: 'REDO', uuid: updateUUID};
    this.broadcastDraw(data);
  }

  //WebRTC
  handleStreamInfo = (data: any) => {
    if (data.from != this.currentUser) {
      switch (data.type) {
        case JOIN_ROOM:
          this.addUser(data.from);
          return this.createPC(data.from, true);
        case EXCHANGE:
          if (data.to !== this.currentUser) { return; }
          return this.exchange(data);
        default:
          return;
      }
    }
  }

  private addUser(user_id: number){
    console.log('other', user_id)
    
    this.userService.getUserById(user_id).subscribe(data => {
      console.log('test add', data)
      this.users[data.userId] = {avatar: data.avatar, name: data.fullName};
    })
  }

  private prepareData(data: Object): string {
    let preData: Object = { user_id: this.currentUser, room_id: this.room, data: data}
    return JSON.stringify(preData);
  }

  sendMessage() {
    console.log('user_message', this.user_message)
    let data = JSON.stringify({user_id: this.currentUser, room_id: this.room, message: this.user_message})  
    this.http.post('http://localhost:3000/rooms/send_message', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(() => {
      this.user_message = "";
    });
  }

  handleMessage = (data: any) => {

    let message = JSON.parse(data);
    if (!this.users[message.user_id]) {
      this.addUser(message.user_id);
    }
    this.messages.push(message);
    // this.messages[data.id] = {user_id: data.user_id, content: data.content};
    // console.log('message', this.messages);
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
