import { Component } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css']
})
export class WeeksComponent {
  forecastDay = []
  forecastDates: Date[] = [];
  forecastData: any[] = [];

  date=new Date();

  constructor(public shareData:ShareDataService) {
    this.calculateForecastDates();
    this.initializeForecastData();
  }
  ngOnInit(): void { }
  
  calculateForecastDates() {
    const currentDate = new Date();
    for (let i = 0; i < 14; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      this.forecastDates.push(nextDate);
    }
  }

  initializeForecastData() {
    for (let i = 0; i < 14; i++) {
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
}


