import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  selectedCity:any = null;


  public cityDetails:any = {
    results:[{name:'',}]
  };
  public weatherDetails:any;
  public forecastDetails:any;

  constructor() { }
  //Trigger search event
  private selectedCitySource = new BehaviorSubject<any>(null);
  selectedCity$ = this.selectedCitySource.asObservable();

  setSelectedCity(city:any) {
    this.selectedCitySource.next(city);
  }
  //set days of week 
  getDayOfWeek(date:string):string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
  }

  // setSelectedCity(city:any){
  //   this.selectedCity = city;
  // }
  getSelectedCity(){
    return this.selectedCity$;
  }
}
