import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingHistoryComponent } from './playing-history.component';

describe('PlayingHistoryComponent', () => {
  let component: PlayingHistoryComponent;
  let fixture: ComponentFixture<PlayingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
