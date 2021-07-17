import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsInfoComponent } from './professors-info.component';

describe('ProfessorsInfoComponent', () => {
  let component: ProfessorsInfoComponent;
  let fixture: ComponentFixture<ProfessorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
