import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPredictionComponent } from './display-prediction.component';

describe('DisplayPredictionComponent', () => {
  let component: DisplayPredictionComponent;
  let fixture: ComponentFixture<DisplayPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayPredictionComponent]
    });
    fixture = TestBed.createComponent(DisplayPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
