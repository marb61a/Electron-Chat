import { Component, OnInit } from '@angular/core';

import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit {

  constructor(private messagesService: MessagesService, private authService: AuthService) { }

  showChat: boolean = false;
  messages = [];
  loadingSpinner: boolean = false;
  MyId;
  MyAvatar;
  currentChatUser;

  ngOnInit() {
    this.messagesService.enteredChat.subscribe((value: any) => {
      this.showChat = value;
      this.getMessages();
      this.currentChatUser = this.messagesService.currentChatUser;
    });
    this.MyAvatar = this.authService.currentUserDetails();
  }

  getMessages() {
    this.loadingSpinner = true;
    this.messagesService.getAllMessages().then((messageObs: any) => {
      if(!messageObs) {
        this.loadingSpinner = false;
        this.messages = [];
        console.log('Nothing To Show');
      } else {
        messageObs.subscribe((messages) => {
          this.loadingSpinner = false;
          this.messages = messages;
        });
      }
    });
  }
}
