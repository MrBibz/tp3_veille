import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioStatutComponent } from './radio-statut.component';

describe('RadioStatutComponent', () => {
  let component: RadioStatutComponent;
  let fixture: ComponentFixture<RadioStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioStatutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
