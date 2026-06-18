import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewEmployeComponent } from './chart-view-employe.component';

describe('ChartViewAdminComponent', () => {
  let component: ChartViewEmployeComponent;
  let fixture: ComponentFixture<ChartViewEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartViewEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartViewEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
