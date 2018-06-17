import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import { constants } from '../constants';

@Injectable()
export class AuthService {
  private authState: any;

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afauth.authState.subscribe((user) => {
      this.authState = user;
    });
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  signup(usercreds) {
    return this.afauth.auth.createUserWithEmailAndPassword(usercreds.email, usercreds.password)
      .then((user) => {
        this.authState = user;
        this.afauth.auth.currentUser.updateProfile({
          displayName: usercreds.displayName,
          photoURL: constants.PROFILE_PIC
        }).then(() => {
          this.setUserData(usercreds.email, usercreds.displayName, user.photoURL);
        });
      });
  }

  setUserData(email: string, displayName: string, photoURL: string) {
    const path = `/users/${this.currentUserId}`;
  }
}
