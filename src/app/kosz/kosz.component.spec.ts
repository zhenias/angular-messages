import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszComponent } from './kosz.component';

describe('KoszComponent', () => {
  let component: KoszComponent;
  let fixture: ComponentFixture<KoszComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KoszComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
