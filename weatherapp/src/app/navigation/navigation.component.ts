import { Component, OnInit,HostListener, ElementRef, Output } from '@angular/core';
import { DataService } from '../services/data.service';
import { ShareDataService } from '../services/share-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  date = new Date();


cityDetails=this.shareData.cityDetails;
weatherDetails =this.shareData.cityDetails;

cityName: string = "New Delhi";
count: any[] = [];
filteredCities: any[] = [];
selectedCity:any[]=[];



  constructor(private service: DataService,
              public shareData: ShareDataService,private router:Router,
              private elementRef:ElementRef){
                this.selectedCity = this.shareData.getSelectedCity();
               }
  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(){
    this.router.navigate(['/map']);
    this.service.getCity(this.cityName, 10)
    .subscribe
    (
      cityData => 
      {
        this.shareData.cityDetails = cityData;

        console.log('vg:',cityData)
        this.cityDetails = cityData
        

        if (cityData.results.length > 0) {
          const lat = cityData.results[0].latitude;
          const lon = cityData.results[0].longitude;

          this.service.getWeather(lat, lon)
          .subscribe
          (
            weatherData => 
            {
              this.shareData.weatherDetails = weatherData;
              console.log('gv:',weatherData)
              this.weatherDetails = weatherData;
            }
          );
        }
      }
    );
  }

  onCityNameChange(value: string) {
    if(value.trim()=== '') {
      this.filteredCities = [];
    }
    this.service.getCity(value, 10).subscribe(res => {
      this.filteredCities = res.results;
    });
  }
  selectCity(city: any){
    this.selectedCity = city;
    this.cityName = city.name;
    this.filteredCities=[];
    this.onSearch();
    this.shareData.setSelectedCity(city);

  }
  location(){
    this.cityName = '';
  }
  @HostListener('document:click', ['$event'])
  onClick(event:MouseEvent) {
    if(this.elementRef.nativeElement.contains(event.target)) {
      this.filteredCities = [];
    }
  }
  @HostListener('document:keydown',['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(event.key === 'Enter' && this.filteredCities) {
      this.selectCity(this.filteredCities[0]);
      event.preventDefault();
    } else if (event.key === 'ArrowDown' && this.filteredCities) {
      const currentIndex = this.filteredCities.indexOf(this.selectedCity);
      const nextIndex = (currentIndex + 1) % this.filteredCities.length;
      this.selectedCity = this.filteredCities[nextIndex];
      event.preventDefault();
    } else if (event.key === 'ArrowUp' && this.filteredCities) {
      const currentIndex = this.filteredCities.indexOf(this.selectedCity);
      const prevIndex = (currentIndex - 1 +this.filteredCities.length) % this.filteredCities.length;
      this.selectedCity = this.filteredCities[prevIndex];
      event.preventDefault();
    }
  }



}
