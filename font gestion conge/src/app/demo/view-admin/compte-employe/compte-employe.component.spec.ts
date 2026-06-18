import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteEmployeComponent } from './compte-employe.component';

describe('CompteEmployeComponent', () => {
  let component: CompteEmployeComponent;
  let fixture: ComponentFixture<CompteEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
