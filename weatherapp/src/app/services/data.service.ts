import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getCity(cityName:string, count:number):Observable<any>{
    return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=${count}&language=en&format=json`)
  }
  getWeather(lat:number, lon:number):Observable<any>{
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,cloudcover_high,relativehumidity_2m,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=auto&forecast_days=16`)
  }
  // getDaysForecast(lat:number, lon:number, startDate:string, endDate:string):Observable<any>{
  //   return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,windspeed_10m_max&timezone=auto&start_date=${startDate}&end_date=${endDate}`)
  // }
  // getClimateChange(lat:number, lon:number,startDate:string,endDate:string){
  //   return this.http.get(`https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,relative_humidity_2m_max`)
  // }
}
