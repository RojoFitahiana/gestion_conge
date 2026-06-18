import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCongeComponent } from './historique-conge.component';

describe('HistoriqueCongeComponent', () => {
  let component: HistoriqueCongeComponent;
  let fixture: ComponentFixture<HistoriqueCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueCongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
