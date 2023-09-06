import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysForecastComponent } from './days-forecast/days-forecast.component';
import { WeeksComponent } from './weeks/weeks.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  {path:'home', component:DailyWeatherComponent},
  {path:'7daysForecast', component:DaysForecastComponent},
  {path:'14daysForecast', component:WeeksComponent},
  {path:'map', component:MapComponent},
  {path:'chart', component:ChartComponent},
  {path:'', redirectTo:'/home',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
