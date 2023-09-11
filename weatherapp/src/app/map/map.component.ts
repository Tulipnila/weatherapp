import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../services/data.service';
import { ShareDataService } from '../services/share-data.service';
import { Map, LatLng, LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  private marker:L.Marker| undefined;

  cityName=this.shareData.cityDetails.results[0].name;
  count:any[]=[];
  
  filteredCities: any[] = [];
  selectedCity:any[]=[];
  
  constructor(public service:DataService,
              public shareData:ShareDataService) {}

  ngOnInit() {
    this.initMap();
    this.searchCity();


   }
  
  ngAfterViewInit() {
    this.searchCity();

    // this.map?.on('click', this.onMapClick.bind(this));
  }

  // onMapClick(e.LeafletMouseEvent){
  //   const lat = e.latlng.lat;
  //   const lon = e.latlng.lng;

  //   this.getCityNameFromCoordinates(lat,lon);
  // }
  getCityNameFromCoordinates(lat:number,lon:number){
    this.shareData.weatherDetails(lat,lon).sub
  }
  get cityDetails(){
    return this.shareData.cityDetails;
   }
   get weatherDetails(){
     return this.shareData.weatherDetails;
   }
  searchCity() {
    this.shareData.selectedCity$.subscribe((city) => {
      if (city) {
        // Update the map with the selected city information
        this.selectCity = city;
        const lat = city.latitude;
        const lon = city.longitude;

        this.marker?.setLatLng([lat, lon]);
        this.marker?.bindPopup(`Location: ${city.name}`).openPopup();
        this.map?.setView([lat, lon], 8);
      }
    });
  }
  private initMap() {
    this.map = L.map('map', {
      center: [28.63576,77.22445], 
      zoom: 10, 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl:'assets/images/marker.png',
      iconSize:[32,32],
      iconAnchor:[16,32],
      popupAnchor:[0,-32],
    });
    this.marker = L.marker([28.63576,77.22445], { icon:customIcon }).addTo(this.map);
    this.marker.bindPopup(`Location: ${this.cityName}`).openPopup();
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
    this.searchCity();
    this.marker?.setLatLng([city.latitude, city.longitude]);
    this.filteredCities=[];
    this.shareData.setSelectedCity(city);



  }
}
  
  

