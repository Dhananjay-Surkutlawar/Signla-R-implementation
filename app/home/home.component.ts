import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { error, log } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, HttpClientModule, NgFor, ChatComponent],
  providers:[ChatService,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


  userForm :FormGroup = new FormGroup({})
  submitted = false 
  apiErroMessage:string[]=[]
  openChat=false


constructor( 
  private  formBuilder : FormBuilder,
  private _ChatService:ChatService
)
{

}

  ngOnInit(): void {

    this.initialform();
  
  }


  initialform()
  {
    this.userForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]]
    })
  }


  subMitForm()
  {
    this.submitted=true;
    if(this.userForm.valid)
    {
      this._ChatService.registerUser(this.userForm.value).subscribe({
        next:()=>{
          this._ChatService.myName=this.userForm.get('name')?.value;

          console.log(this._ChatService.myName);
          
          

          this.openChat=true
          this.userForm.reset();
          this.submitted=false
         
          
        },
        error:error=>{
          if(typeof(error.error)!=='object'){
            this.apiErroMessage.push(error.error)
          }
        }
      })
      
    }
  }

  closeChat()
  {
    this.openChat=false
  }


}
