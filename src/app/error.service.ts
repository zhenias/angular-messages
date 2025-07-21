import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  public errorMessage$ = this.errorSubject.asObservable();

  private successSubject = new BehaviorSubject<string | null>(null);
  public successMessage$ = this.successSubject.asObservable();

  private warningSubject = new BehaviorSubject<string | null>(null);
  public warningMessage$ = this.warningSubject.asObservable();

  showError(message: string, type?:"error"|"success"|"warning"): void {
    this.clearError();

    switch (type) {
      case "error":
        this.errorSubject.next(message);
        break;
      case "success":
        this.successSubject.next(message);
        break;
      case "warning":
        this.warningSubject.next(message);
        break;
      default:
        this.errorSubject.next(message);
    }

    setTimeout(() => this.clearError(), 5000);
  }

  clearError(): void {
    this.errorSubject.next(null);
    this.successSubject.next(null);
    this.warningSubject.next(null);
  }
}
