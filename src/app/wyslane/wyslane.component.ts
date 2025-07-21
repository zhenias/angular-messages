import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { NgFor, NgIf } from '@angular/common';
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-wyslane',
    imports: [
        NgFor, NgIf, LoaderComponent
    ],
  templateUrl: './wyslane.component.html',
  styleUrls: ['./wyslane.component.css']
})
export class WyslaneComponent extends AppComponent implements OnInit {
  private method: string = '/Sent';
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
        this.isLoading = false;

        this.errorService.showError('Wystąpił błąd.');
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getMessagesFetch(page);
    }
  }
}
