import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-custom-date',
  templateUrl: './custom-date.component.html',
  styleUrls: ['./custom-date.component.css']
})
export class CustomDateComponent implements OnInit {
  cityName: string = '';
  startDate: string = '';
  endDate: string = '';
  forecastData: any[] = [];
  forecastDates: Date[] = [];
  latitude: number = 0;
  longitude: number = 0;

  constructor(private service: DataService) {}

  ngOnInit(): void {}

  getCoordinates() {
    if (!this.cityName) {
      return;
    }

    this.service.getCity(this.cityName, 5).subscribe(
      (cityData) => {
        if (cityData.results && cityData.results[0]) {
          this.latitude = cityData.results[0].latitude;
          this.longitude = cityData.results[0].longitude;
        }
      },
      (error) => {
        console.error('Error fetching city coordinates:', error);
      }
    );
  }

  checkWeather() {
    if (!this.startDate || !this.endDate || this.latitude === 0 || this.longitude === 0) {
      return;
    }

    this.forecastData = [];

    this.service.getDaysForecast(this.latitude, this.longitude, this.startDate, this.endDate).subscribe(
      (weatherData) => {
        for (const forecast of weatherData.forecast) {
          this.forecastData.push({
            date: forecast.date,
            temperatureMax: forecast.temperatureMax,
            temperatureMin: forecast.temperatureMin
          });
        }
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );

    this.calculateForecastDates(new Date(this.startDate), new Date(this.endDate));
  }

  calculateForecastDates(startDate: Date, endDate: Date) {
    this.forecastDates = [];

    while (startDate <= endDate) {
      this.forecastDates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
  }
}
