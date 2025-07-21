import { Routes } from '@angular/router';
import { WiadomosciComponent } from './wiadomosci/wiadomosci.component';
import { WyslaneComponent } from './wyslane/wyslane.component';
import { KoszComponent } from './kosz/kosz.component';
import { PokazWiadomoscComponent } from './pokaz-wiadomosc/pokaz-wiadomosc.component';
import { NapiszWiadomoscComponent } from './napisz-wiadomosc/napisz-wiadomosc.component';
import { NotLoggedComponent } from './not-logged/not-logged.component';

export const routes: Routes = [
  { path: '', redirectTo: '/glowne', pathMatch: 'full' },
  { path: 'glowne', component: WiadomosciComponent },
  { path: 'wyslane', component: WyslaneComponent },
  { path: 'kosz', component: KoszComponent },
  { path: 'wyswietl/:id', component: PokazWiadomoscComponent },
  { path: 'napiszWiadomosc', component: NapiszWiadomoscComponent },
  { path: 'not_logged', component: NotLoggedComponent },
];
