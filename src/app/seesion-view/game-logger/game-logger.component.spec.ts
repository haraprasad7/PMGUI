import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoggerComponent } from './game-logger.component';

describe('GameLoggerComponent', () => {
  let component: GameLoggerComponent;
  let fixture: ComponentFixture<GameLoggerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameLoggerComponent]
    });
    fixture = TestBed.createComponent(GameLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
