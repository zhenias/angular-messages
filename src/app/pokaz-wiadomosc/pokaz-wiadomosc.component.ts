import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { MessageService } from '../message.service';
import { MessageView } from '../Interface/Message/message-view';
import { FormsModule } from '@angular/forms';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {LoaderComponent} from '../loader/loader.component';

@Component({
  selector: 'app-pokaz-wiadomosc',
  imports: [
    FormsModule, NgClass, NgIf, NgFor, LoaderComponent
  ],
  templateUrl: './pokaz-wiadomosc.component.html',
  styleUrl: './pokaz-wiadomosc.component.css'
})
export class PokazWiadomoscComponent extends AppComponent {
  private route = inject(ActivatedRoute);

  private id: number = 0;

  private method: string = '/';
  private putTrash: string = 'putTrash';
  private restoreTrash: string = 'restoreTrash';

  public nowaWiadomosc: MessageView = {};

  private messageService = inject(MessageService);

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    const headers = this.setHeaderAuthorization();

    if (isNaN(this.id)) {
      this.errorService.showError('Wystąpił błąd, coś poszło nie tak.');

      this.router.navigate(['/glowne']);

      return;
    }

    this.http.get<MessageView>(`${this.url}${this.method}${this.id}`, { headers }).subscribe({
      next: (response: MessageView) => {
        this.nowaWiadomosc = response;

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = true;

        this.errorService.showError('Nie udało się odczytać wiadomości :(');

        this.router.navigate(['/glowne']);
      }
    });
  }

  public wycofajWiadomosc() {
    this.http.post(`${this.url}${this.method}/${this.id}/${this.putTrash}?access_token=${this.token}`, null, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.errorService.showError('Wiadomość została cofnięta.', 'success');
      },
      error: (err) => {
        this.errorService.showError('Nie udało się wycofać wiadomości do kosza. Spróbuj ponownie później.');
      }
    });
  }

  public przywrocWiadomosc() {
    this.http.post(`${this.url}${this.method}/${this.id}/${this.restoreTrash}?access_token=${this.token}`, null, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.errorService.showError('Wiadomość została przywrócona.', 'success');
      },
      error: (err) => {
        this.errorService.showError('Nie udało się przywrócić wiadomości. Spróbuj ponownie później.');
      }
    });
  }

  public odpowiedzNaWiadomosc() {
    this.nowaWiadomosc.topic = `Re: ${this.nowaWiadomosc.topic}`;
    this.nowaWiadomosc.content = `\n\n--------------\nOdpowiedź na wiadomość od: ${this.nowaWiadomosc.from}\n\n${this.nowaWiadomosc.content}`;

    const data = {
      temat: this.nowaWiadomosc.topic,
      tresc: this.nowaWiadomosc.content,
      user_id: this.nowaWiadomosc.user_id,
    };

    this.messageService.sendMessage(data);

    this.router.navigate(['/napiszWiadomosc']);
  }

  public przeslijWiadomosc() {
    this.nowaWiadomosc.topic = `Fwd: ${this.nowaWiadomosc.topic}`;
    this.nowaWiadomosc.content = `\n\n--------------\nPrzesłana wiadomość od: ${this.nowaWiadomosc.from}\n\n${this.nowaWiadomosc.content}`;

    const data = {
      temat: this.nowaWiadomosc.topic,
      tresc: this.nowaWiadomosc.content,
    };

    this.messageService.sendMessage(data);

    this.router.navigate(['/napiszWiadomosc']);
  }
}
