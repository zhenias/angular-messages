import { Component, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import {CommonModule, NgClass, NgFor, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';
import { MessageService } from '../message.service';
import {RoleMessage} from '../Interface/Message/role-message';
import {LoaderComponent} from '../loader/loader.component';
import {MessageView} from '../Interface/Message/message-view';

@Component({
  selector: 'app-napisz-wiadomosc',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, NgFor, NgClass, CommonModule, LoaderComponent],
  templateUrl: './napisz-wiadomosc.component.html',
  styleUrls: ['./napisz-wiadomosc.component.css'],
})
export class NapiszWiadomoscComponent extends AppComponent {
  public nowaWiadomosc = {
    temat: '',
    tresc: '',
  };

  public role: RoleMessage = {
    pracownicy: [],
    dyrektor: [],
    sekretarz: [],
    zastepstwa: [],
    pedagog: [],
    pomoc: []
  };

  public wybraniUzytkownicy: number[] = [];
  private i: number = 0;

  private method: string = '/';
  private messageService = inject(MessageService);

  protected isSectionOpen: any ={
    pracownicy: false,
    dyrektor: false,
    sekretarz: false,
    zastepstwa: false,
    pedagog: false,
  };

  public ngOnInit(): void {
    this.isLoading = false;

    this.messageService.currentMessage.subscribe((message) => {
      if (!message) return;

      this.nowaWiadomosc.temat = message.temat;
      this.nowaWiadomosc.tresc = message.tresc;

      if (message?.user_id) {
        this.zarzadzWybranymiUzytkownikami(message.user_id);
      }
    });

    this.pobierzRoleZUzytkownikami();
  }

  get isButtonDisabled(): boolean {
    return this.isLoading || !this.nowaWiadomosc.tresc || !this.nowaWiadomosc.temat || !this.wybraniUzytkownicy;
  }

  public async wyslijWiadomosc(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.showUnReadMessage();
    this.isLoading = true;

    const { temat, tresc } = this.nowaWiadomosc;

    if (temat.length <= 0 || tresc.length <= 0 || this.wybraniUzytkownicy.length <= 0) {
      this.isLoading = false;

      this.errorService.showError(
        'Wypełnij wszystkie pola i wybierz użytkowników.'
      );

      return;
    }

    const params = {
      subject: temat,
      content: tresc,
      'recipients[]': this.wybraniUzytkownicy
    };

    const headers = this.setHeaderAuthorization();

    this.http.get<any>(`${this.url}${this.method}`, { headers, params }).subscribe({
      next: (response) => {
        this.errorService.showError('Wiadomość została wysłana. <br> Przekierowano do wysłanych wiadomości.', "success");

        this.isLoading = false;

        this.router.navigate(['/wyslane']);
      },
      error: (err) => {
        this.isLoading = false;

        this.errorService.showError('Nie udało się wysłać wiadomości. <br> Spróbuj ponownie później.');
      }
    });
  }

  protected pobierzRoleZUzytkownikami(): void {
    const headers = this.setHeaderAuthorization();

    this.http.get<RoleMessage>(`/api/School/Teachers/Role`, { headers }).subscribe({
      next: (response: RoleMessage) => {
        this.role = response;
      },
      error: (err) => {
        this.errorService.showError(
          'Błąd podczas pobierania ról i użytkowników. <br> Spróbuj ponownie później.'
        );
      }
    });
  }

  protected zarzadzWybranymiUzytkownikami(userId?: number): void {
    if (!userId) {
      return;
    }

    const index = this.wybraniUzytkownicy.indexOf(userId);

    if (index > -1) {
      this.wybraniUzytkownicy.splice(index, 1);
    } else {
      this.wybraniUzytkownicy.push(userId);
    }
  }

  protected znajdzNazweUzytkownika(userId: number): string {
    for (const key in this.role) {
      const users = this.role[key as keyof typeof this.role];
      const user = users.find(
        (u) => u.id === userId
      );

      if (user) {
        return user.name || 'Nieznany użytkownik.';
      }
    }

    return 'Nieznany użytkownik.';
  }

  protected usunWybranegoUzytkownika(userId: number): void {
    const index = this.wybraniUzytkownicy.indexOf(userId);

    if (index > -1) {
      this.wybraniUzytkownicy.splice(index, 1);
    }
  }

  protected toggleSection(section: string): void {
    this.isSectionOpen[section] = !this.isSectionOpen[section];
  }
}
