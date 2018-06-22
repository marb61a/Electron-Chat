import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class FriendsService {

  constructor(private afauth: AngularFireAuth, private afs: AngularFirestore) { }

  getMyFriends() {
    return new Promise((resolve) => {

    });
  }

  getFriendList() {

  }
}
