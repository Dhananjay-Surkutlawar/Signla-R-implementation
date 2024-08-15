import { Component, Output, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from  '@angular/core';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatINputComponent {

  @Output() contentEmitter = new EventEmitter<string>();


  content : string = ''

  sendMessage()
  {

    if(this.content.trim()!=='')
    {
      this.contentEmitter.emit(this.content);
    }
    this.content=''
  }

}
