import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'
import { environment } from './../../environments/environment';
// import * as environment from '../../assets/app-config.json';


@Injectable({ providedIn: 'root' })

export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient) {
      this.angularFireMessaging.messages.subscribe(
        (payload: any) => {
          // Handle the incoming message payload here
        }
      )
  }

  requestPermission(applicationId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
         this.http.post<any>(`${environment.INTERACTION_ENGINE}/notification/${applicationId}/register`,{token}).subscribe(data=>{
           console.log(data);
         })

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
        
      })
  }
}