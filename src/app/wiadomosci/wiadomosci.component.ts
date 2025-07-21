import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { NgIf, NgFor } from '@angular/common';
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-wiadomosci',
    imports: [
        NgIf, NgFor, LoaderComponent
    ],
  templateUrl: './wiadomosci.component.html',
  styleUrls: ['./wiadomosci.component.css']
})
export class WiadomosciComponent extends AppComponent {
  private method: string = '/Home';
  public currentPage: number = 1;
  public totalPages: number = 1;

  ngOnInit(): void {
    this.getMessagesFetch();
  }

  private getMessagesFetch(page: number = 1): void {
    this.isLoading = true;

    const headers = this.setHeaderAuthorization();

    this.http.get<any>(`${this.url}${this.method}?page=${page}&per_page=${this.perPage}`, { headers }).subscribe({
      next: (response) => {
        this.wiadomosci = response.data;
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = true;

        this.errorService.showError('Wystąpił błąd.');
      }
    });
  }

  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getMessagesFetch(page);
    }
  }
}
