import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  @Input() messages:any =[]


  constructor()
  {

  }

}
