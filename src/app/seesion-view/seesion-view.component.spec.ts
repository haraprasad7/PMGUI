import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeesionViewComponent } from './seesion-view.component';

describe('SeesionViewComponent', () => {
  let component: SeesionViewComponent;
  let fixture: ComponentFixture<SeesionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeesionViewComponent]
    });
    fixture = TestBed.createComponent(SeesionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
