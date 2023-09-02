import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-custom-date',
  templateUrl: './custom-date.component.html',
  styleUrls: ['./custom-date.component.css']
})
export class CustomDateComponent implements OnInit {
  startDate:string='';
  endDate:string='';

  cityName:string = '';
  lat:any;
  lon:any;

  constructor(public shareData:ShareDataService,
              public service: DataService){}
  
  ngOnInit(): void {
  this.checkWeather();
  }  

  checkWeather(){
    
    this.service.getCity(this.cityName,5).subscribe (
      data => {
        this.shareData.cityDetails = data;

        if (data.results.length > 0) {
          const lat = data.results[0].latitude;
          const lon = data.results[0].longitude;
        
    this.service.getWeather(lat, lon).subscribe (
      weatherData => {
        this.shareData.weatherDetails = weatherData;
          console.log('dsfdas:',weatherData)

      } 
    );
        }
      }
    );

  }
}
