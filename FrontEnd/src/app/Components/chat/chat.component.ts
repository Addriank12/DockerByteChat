import { NgFor, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../Services/chat.service';
import { message } from '../../Models/message';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  userName: string = '';
  hasEnteredName: boolean = false;
  message: string = '';
  public messages: message[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe((messages: message[]) => {
      this.messages = messages;
    });
  }

  sendMessage() {    
    if (!this.hasEnteredName) {
      if (this.message.trim()) {
        this.userName = this.message.trim();
        this.hasEnteredName = true;
        this.message = '';
      } else {
        alert('Por favor, ingresa tu nombre.');
      }
    } else {
      if (this.message.trim()) {
        const Messagge: message = {
          message: this.message,
          author: this.userName,
          date: new Date()
        };
        this.message = '';
        this.chatService.enviarMensaje(Messagge);
      }
    }
  }
}
