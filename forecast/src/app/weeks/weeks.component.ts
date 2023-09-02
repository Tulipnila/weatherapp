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

  shiftLeft = false;
  shiftRight = false;

  // selectedDate:Date = new Date();

  constructor(public shareData:ShareDataService) {
    this.calculateForecastDates();
    this.initializeForecastData();
  }

  ngOnInit(): void {
    
  }
  
  calculateForecastDates() {
    const currentDate = new Date();
    for (let i = 0; i < 14; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      this.forecastDates.push(nextDate);
      
    }
  }

  initializeForecastData() {
    // Initialize forecast data for each day (replace with your actual data structure)
    for (let i = 0; i < 14; i++) {
      const forecastDay = {
        date: this.forecastDates[i],
        temperatureMax: 0, // Replace with actual temperature data
        temperatureMin: 0, // Replace with actual temperature data
        humidity: 0, // Replace with actual humidity data
        uvIndex: 0 // Replace with actual UV index data
      };
      this.forecastData.push(forecastDay);
    }
  }

  // updateSelectedDate(date : Date) {
  //   this.selectedDate = date;
  //   this.forecastData = this.forecastData.filter(day => day.date === this.selectedDate);
  // }


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


