import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownGenresComponent } from './dropdown-genres.component';

describe('DropdownGenresComponent', () => {
  let component: DropdownGenresComponent;
  let fixture: ComponentFixture<DropdownGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownGenresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
