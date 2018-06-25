import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';
import { ElementDef } from '@angular/core/src/view';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit {
  @ViewChild('scrollMe') private myScroller: ElementRef;

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
      if (!messageObs) {
        this.loadingSpinner = false;
        this.messages = [];
        console.log('Nothing To Show');
      } else {
        messageObs.subscribe((messages) => {
          this.loadingSpinner = false;
          this.messages = messages;
          this.scrollDown();
        });
      }
    });
  }

  // Scroll Down
  scrollDown() {
    setTimeout(() => {
      this.myScroller.nativeElement.scrollTop = this.myScroller.nativeElement.scrollHeight;
    }, 1000);
  }

  // Choose the bubble style
  chooseClass(msg) {
    this.MyId = this.authService.currentUserDetails().email;
    if (msg.sentby != this.MyId) {
      return 'bubble client';
    } else {
      return 'bubble';
    }
  }
}
