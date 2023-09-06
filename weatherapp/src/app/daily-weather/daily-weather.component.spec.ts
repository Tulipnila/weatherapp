import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherComponent } from './daily-weather.component';

describe('DailyWeatherComponent', () => {
  let component: DailyWeatherComponent;
  let fixture: ComponentFixture<DailyWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyWeatherComponent]
    });
    fixture = TestBed.createComponent(DailyWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
