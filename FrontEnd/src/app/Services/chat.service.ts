import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { message } from '../Models/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private socket = io('http://localhost:3000');
  constructor() {
    // Escuchar mensajes del servidor
    this.socket.on('mensaje', (msg: message) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, msg]);
    });
  }

  // Enviar mensaje al servidor
  public enviarMensaje(Messagge: message) {
    this.socket.emit('mensaje', Messagge);
  }
}
