import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BehaviorSubject } from 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class RequestsService {

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) { }

  requestRef = this.afs.collection('requests');

  addRequest(newrequest) {
    return this.requestRef.add({
      sender: this.afauth.auth.currentUser.email,
      receiver: newrequest
    });
  }

  getMyRequests() {
    this.afs.collection('requests', ref => ref.where('receiver', '==',
    this.afauth.auth.currentUser.email)).valueChanges();
  }
}
