import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { DataService } from './services/data.service';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DaysForecastComponent } from './days-forecast/days-forecast.component';
import { WeeksComponent } from './weeks/weeks.component';
// import { CustomDateComponent } from './custom-date/custom-date.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DailyWeatherComponent,
    TimeFormatPipe,
    DaysForecastComponent,
    // CustomDateComponent,
    WeeksComponent,
    MapComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule, AppRoutingModule,
    GoogleMapsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
