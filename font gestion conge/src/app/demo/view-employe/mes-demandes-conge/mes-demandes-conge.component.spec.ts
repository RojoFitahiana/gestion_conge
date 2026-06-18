import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesCongeComponent } from './mes-demandes-conge.component';

describe('MesDemandesCongeComponent', () => {
  let component: MesDemandesCongeComponent;
  let fixture: ComponentFixture<MesDemandesCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesDemandesCongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDemandesCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
