
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { ChatINputComponent } from "../chat-input/chat-input.component";
import { MessagesComponent } from "../messages/messages.component";




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HttpClientModule, NgFor, ChatINputComponent, MessagesComponent],
  providers:[ChatService,],

  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent  implements OnInit {


  @Output() closeChatEmitter = new EventEmitter<void>();


  constructor(
    public chatService:ChatService
  )
  {

    this.chatService.createChatConnection( );


 
  }

  ngOnInit(): void {
    console.log(this.chatService.OnlineUsers);
  }


  backToHome()
  {
    this.closeChatEmitter.emit();
  }

 
  sendMessagService(message : any)
  {
    this.chatService.sendMessage(message)
  }




}
