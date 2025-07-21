import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    NgIf,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected isLoading: boolean = true;

  protected url: string = '/api/Messages';
  protected wiadomosci: any[] = [];
  protected token: string = '';

  public errorMessage: string|null = null;
  public successMessage: string|null = null;
  public warningMessage: string|null = null;

  public access_token: string|null = null;

  public countMessageUnread: number = 0;
  public isPopupOpen: boolean = false;

  protected perPage: number = 20;

  protected userInfo: {
    user_name: string,
    user_lastname: string,
    full_user_name?: string,
  } = {
    user_name: '',
    user_lastname: '',
  };

  constructor(
    protected router: Router,
    protected http: HttpClient,
    protected errorService: ErrorService,
  ) {
    this.errorService.errorMessage$.subscribe((message: any) => {
      this.errorMessage = message;
    });

    this.errorService.successMessage$.subscribe((message: any) => {
      this.successMessage = message;
    });

    this.errorService.warningMessage$.subscribe((message: any) => {
      this.warningMessage = message;
    });

    this.getMe();
    // this.showUnReadMessage();
  }

  protected setHeaderAuthorization(): HttpHeaders {
    const accessTokenCookie = this.getCookie('_token');
    this.access_token = accessTokenCookie || 'a938a437dfa42838af5a99f3a3f9e11d6da5de69c228ba5666d398456e42d0eb';

    return new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Content-type': 'application/json',
      'Accept': 'application/json'
    });
  }

  get userFullName(): string {
    return this.userInfo?.full_user_name
      ? this.userInfo.full_user_name
      : '';
  }

  protected getCookie(name: string): string {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length);
      }
    }

    return '';
  }

  protected pokazWiadomoscRouter(id: number): void {
    this.showUnReadMessage();

    this.router.navigate(['/wyswietl', id]);
  }

  protected showUnReadMessage(): void {
    const headers = this.setHeaderAuthorization();

    this.http.get<any>(`${this.url}/Count`, { headers }).subscribe({
      next: (response) => {
        this.countMessageUnread = response;
      },
    });
  }

  protected getMe(): void {
    const headers = this.setHeaderAuthorization();

    this.http.get<any>(`/api/getMe`, { headers }).subscribe({
      next: (response) => {
        this.userInfo = response;
      },
    });
  }

  clearError(): void {
    this.errorService.clearError();
  }

  otworzPopup(): void {
    this.isPopupOpen = true;
  }

  zamknijPopup(): void {
    this.isPopupOpen = false;
  }
}
