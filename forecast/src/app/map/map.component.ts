import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../services/data.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  private marker:L.Marker| undefined;

  cityName:any;
  cityDetails = {};
  weatherDetails = {};
  count:any[]=[];

  filteredCities: any[] = [];
  selectedCity:any[]=[];
  
  constructor(public service:DataService,
              public shareData:ShareDataService) {
                this.selectedCity = this.shareData.getSelectedCity();
              }

  ngOnInit() { }
  
  ngAfterViewInit() {
    this.initMap();
  }

  searchCity() {
    this.service.getCity(this.cityName, 5).subscribe((cityData) => {

      if (cityData.results && cityData.results.length > 0) {
        const lat = cityData.results[0].latitude;
        const lon = cityData.results[0].longitude;

        console.log('latitude:',lat);
        console.log('longitude:',lon);
  
        this.marker?.setLatLng([lat, lon]);
        this.map?.setView([lat, lon], 13);

      }
    });
  }

  private initMap() {
    this.map = L.map('map', {
      center: [0,0], 
      zoom: 13, 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl:'assets/images/marker.png',
      iconSize:[32,32],
      iconAnchor:[16,32],
      popupAnchor:[0,-32],
    });
    this.marker = L.marker([0,0], { icon:customIcon }).addTo(this.map);
    // this.marker.bindPopup(``).openPopup();
  }
  onCityNameChange(value: string) {
    if(value.trim()=== '') {
      this.filteredCities = [];
    }
    this.service.getCity(value, 5).subscribe(res => {
      this.filteredCities = res.results;
    });
  }
  selectCity(city: any){
    this.selectedCity = city;
    this.cityName = city.name;
    this.filteredCities=[];
    this.searchCity();
    this.shareData.setSelectedCity(city);

  }
}
  
  

