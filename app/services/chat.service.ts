import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { error, log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  myName = '';
  OnlineUsers:string[] = []
  Message:any[]=[]

  private chatConnection?: HubConnection;

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post(
      `${environment.apiUrl}api/chat/registered-user`,
      user,
      {
        responseType: 'text',
      }
    );
  }

  createChatConnection() {
    this.chatConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}hubs/chat`) // Ensure this matches your backend hub URL
      .withAutomaticReconnect()
      .build();

    this.chatConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
      
      })
.catch((error) => console.log('SignalR Connection Error:', error));


      this.chatConnection.on('UserConnected',()=>{
        this.addUserConnectionId();

      })

      this.chatConnection.on('OnlineUsers',(OnlineUsers)=>{
        this.OnlineUsers = [...OnlineUsers]

        console.log(this.OnlineUsers);
        
      })

      this.chatConnection.on('NewMessage',(messages)=>{
        this.Message = this.Message.concat(messages);
console.log(this.Message);

        
      })
  }






  stopChatConnection() {
    this.chatConnection?.stop().catch((error) => {
      console.log(error);
    });
  }

  async addUserConnectionId() {
    return this.chatConnection
      ?.invoke('AddUserConnectionId', this.myName)
      .catch((error) => console.log(error));
  }
 
  async sendMessage(message: string) {
    let data = {
      from: this.myName,
      content: message
    };
    return this.chatConnection?.invoke('ReceiveMessage', data).catch(error => {
      console.log(error);
    });
  }
  
} 
