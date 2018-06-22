import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class MessagesService {
  enteredChat = new Subject();
  currentChatUser;
  firstDocId: string;
  secondDocId: string;

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) { }

  enterChat(user) {
    this.currentChatUser = user;
    this.enteredChat.next(true);
  }

  addNewMsg() {
    let collRef = this.afs.collection('conversations').ref;
  }

  getAllMessages() {
    return new Promise((resolve) => {
      let collRef = this.afs.collection('conversations').ref;

    });
  }
}
