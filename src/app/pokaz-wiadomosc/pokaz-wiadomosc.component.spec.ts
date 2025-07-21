import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokazWiadomoscComponent } from './pokaz-wiadomosc.component';

describe('PokazWiadomoscComponent', () => {
  let component: PokazWiadomoscComponent;
  let fixture: ComponentFixture<PokazWiadomoscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokazWiadomoscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokazWiadomoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
