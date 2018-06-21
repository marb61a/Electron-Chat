import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs/Rx';

import { UserService } from '../../services/user.service';
import { RequestsService } from '../../services/requests.service';
import { FriendsService } from '../../services/friends.service';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css']
})
export class AddfriendComponent implements OnInit {
  users;
  isFriends = [];
  isSent = [];
  isRequested = [];

  constructor(
    private userService: UserService,
    private requestsService: RequestsService,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }

  addFriend(user) {
    this.requestsService.addRequest(user.email).then(() => {
      this.snackBar.open('Request Sent', 'Okay', {duration: 3000});
    });
  }

  // Instant Searching
  instantSearch($event) {

  }

  canShow(index) {
    if (this.isFriends[index]) {
      return false;
    } else if (this.isRequested[index]) {
      return false;
    } else if (this.isSent[index]) {
      return false;
    } else {
      return true;
    }
  }

}
