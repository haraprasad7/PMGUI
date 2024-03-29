import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDisplayPredictionComponent } from './host-display-prediction.component';

describe('HostDisplayPredictionComponent', () => {
  let component: HostDisplayPredictionComponent;
  let fixture: ComponentFixture<HostDisplayPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostDisplayPredictionComponent]
    });
    fixture = TestBed.createComponent(HostDisplayPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
