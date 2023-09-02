import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { DataService } from './services/data.service';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { DaysForecastComponent } from './days-forecast/days-forecast.component';
import { CustomDateComponent } from './custom-date/custom-date.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';
import { WeeksComponent } from './weeks/weeks.component';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DailyWeatherComponent,
    TimeFormatPipe,
    DaysForecastComponent,
    CustomDateComponent,
    MapComponent,
    ChartComponent,
    WeeksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,FormsModule,
    AppRoutingModule,
    GoogleMapsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
