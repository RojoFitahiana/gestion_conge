import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewAdminComponent } from './chart-view-admin.component';

describe('ChartViewAdminComponent', () => {
  let component: ChartViewAdminComponent;
  let fixture: ComponentFixture<ChartViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartViewAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
