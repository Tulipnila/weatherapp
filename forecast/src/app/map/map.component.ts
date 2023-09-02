import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 
  constructor(){}

  ngOnInit(): void {
    this.initMap();
   }

  display:any;
  center:google.maps.LatLngLiteral = {
    lat:22.2736,
    lng:70.7512
  };
  zoom = 6;

  initMap():void {
    try{
        const mapContainer = document.getElementById('map');
          if (mapContainer !== null) {
            const map = new google.maps.Map(mapContainer, {
            center: this.center,
            zoom: this.zoom
            });
          
            map.addListener('click', (event: google.maps.MapMouseEvent) => {
              if (event.latLng !== null) this.moveMap(event);
            });
          } else {
            console.error('Map container not found.');
          }
        } catch (error){
          console.error('Error initializing the map:',error);
        }

  }
  




  moveMap(event: google.maps.MapMouseEvent): void {
    if (event && event.latLng !== null) {
      this.center = event.latLng.toJSON();
    }
  }
  
  move(event: google.maps.MapMouseEvent): void {
    if (event && event.latLng !== null) {
      this.display = event.latLng.toJSON();
    }
  }
}