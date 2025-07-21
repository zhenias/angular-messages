import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapiszWiadomoscComponent } from './napisz-wiadomosc.component';

describe('NapiszWiadomoscComponent', () => {
  let component: NapiszWiadomoscComponent;
  let fixture: ComponentFixture<NapiszWiadomoscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NapiszWiadomoscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NapiszWiadomoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
