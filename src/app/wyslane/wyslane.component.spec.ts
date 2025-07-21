import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyslaneComponent } from './wyslane.component';

describe('WyslaneComponent', () => {
  let component: WyslaneComponent;
  let fixture: ComponentFixture<WyslaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WyslaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WyslaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
