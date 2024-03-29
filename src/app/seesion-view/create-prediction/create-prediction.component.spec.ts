import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePredictionComponent } from './create-prediction.component';

describe('CreatePredictionComponent', () => {
  let component: CreatePredictionComponent;
  let fixture: ComponentFixture<CreatePredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePredictionComponent]
    });
    fixture = TestBed.createComponent(CreatePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
