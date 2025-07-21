import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: boolean = true;

  get isLoading$() {
    return this.loadingSubject;
  }

  set isLoading$(isLoading: boolean) {
    this.loadingSubject = isLoading;
  }

  setLoadingState(isLoading: boolean) {
    this.loadingSubject = isLoading;
  }
}
