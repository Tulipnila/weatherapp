import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-days-forecast',
  templateUrl: './days-forecast.component.html',
  styleUrls: ['./days-forecast.component.css']
})
export class DaysForecastComponent implements OnInit  {
  forecastDay = []
  forecastDates: Date[] = [];
  forecastData: any[] = [];

  shiftLeft = false;
  shiftRight = false;

  constructor(public shareData:ShareDataService) {
    this.calculateForecastDates();
    this.initializeForecastData();
  }

  ngOnInit(): void {}
  
  calculateForecastDates() {
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      this.forecastDates.push(nextDate);
    }
  }
  isCurrentDate(date:Date):boolean{
    const currentDate = new Date();
    return date.toDateString()=== currentDate.toDateString();
  }
  initializeForecastData() {
    for (let i = 0; i < 7; i++) {
      const forecastDay = {
        date: this.forecastDates[i],
        temperatureMax: 0, 
        temperatureMin: 0, 
        humidity: 0, 
        uvIndex: 0 
      };
      this.forecastData.push(forecastDay);
    }
  }

  get cityDetails(){
    return this.shareData.cityDetails;
  }
  get weatherDetails(){
    return this.shareData.weatherDetails;
  }

  shiftDates(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.forecastDates.push(this.forecastDates.shift()!);
      this.shiftLeft = true;
      setTimeout(() => (this.shiftLeft = false), 500);
    } else if (direction === 'right') {
      this.forecastDates.unshift(this.forecastDates.pop()!);
      this.shiftRight = true;
      setTimeout(() => (this.shiftRight = false), 500);
    }
  }
}
