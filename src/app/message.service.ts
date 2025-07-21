import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject<any>(null);
  currentMessage = this.messageSource.asObservable();

  sendMessage(message: any) {
    this.messageSource.next(message);
  }
}
