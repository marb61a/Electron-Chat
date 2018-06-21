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
  startAt = new Subject();
  endAt = new Subject();
  isFriends = [];
  isSent = [];
  isRequested = [];

  // For instant search
  myFriends = [];
  myRequests = [];
  mySentRequests = [];

  constructor(
    private userService: UserService,
    private requestsService: RequestsService,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: any) => {
      // Friends Filter
      this.friendsService.getMyFriends().then((res: any) => {
        res.subscribe((user) => {
          if (user == 'Exists') {
            this.friendsService.getFriendList().subscribe((friends: any) => {
              this.myFriends = friends;
              if (friends) {
                this.isFriends = [];
                let flag = 0;
                users.map((userElement, i) => {
                  friends.forEach((friendElement) => {
                    if (userElement.email == friendElement.email) {
                      flag += 1;
                    }
                  });
                  if (flag == 1) {
                    this.isFriends[i] = true;
                    flag = 0;
                  } else {
                    this.isFriends[i] = false;
                    flag = 0;
                  }
                });
              } else {
                users.map((userElement, i) => {
                  this.isFriends[i] = false;
                });
              }
            });
          }
        });
      });

      // Filter out the previous requested users
      this.requestsService.getMyRequests().subscribe((requests: any) => {
        let flag = 0;
        this.myRequests = requests;
        this.isRequested = [];
        users.forEach((userElement, i) => {
          requests.forEach((requestElement) => {
            if (userElement.email == requestElement.sender) {
              flag += 1;
            }
          });
          if (flag == 1) {
            this.isRequested[i] = true;
            flag = 0;
          } else {
            this.isRequested[i] = false;
            flag = 0;
          }
        });
      });

      // Filter out the users who have sent you requests
      this.requestsService.getSentRequests().subscribe((requests: any) => {
        let flag = 0;
        this.mySentRequests = requests;
        this.isSent = [];
        users.forEach((userElement, i) => {
          requests.forEach((requestElement) => {
            if (userElement.email == requestElement.receiver) {
              flag += 1;
            }
          });
          if (flag == 1) {
            this.isSent[i] = true;
            flag = 0;
          } else {
            this.isSent[i] = false;
            flag = 0;
          }
        });
      });

      this.users = users;
    });
  }

  instantSearchFilter (users) {
    if (this.myFriends) {

    }
  }

  addFriend(user) {
    this.requestsService.addRequest(user.email).then(() => {
      this.snackBar.open('Request Sent', 'Okay', {duration: 3000});
    });
  }

  // Instant Searching
  instantSearch($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
      Observable.combineLatest(this.startAt, this.endAt).take(1).subscribe((value) => {
        this.userService.instantSearch(value[0], value[1]).take(1).subscribe((users) => {

        });
      });
    }
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
