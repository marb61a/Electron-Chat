import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  currentUser = new BehaviorSubject<firebase.User>(this.afauth.auth.currentUser);

  constructor(private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe((user: firebase.User) => {
      this.currentUser.next(user);
    });
  }

}
