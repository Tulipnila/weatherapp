import { Component,OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../services/data.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chart:any;
  public cityName:string = '';

  constructor(private service:DataService, private shareData:ShareDataService){}
  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(){
    const latitude = 52.52;
    const longitude = 13.24;
        this.service.getWeather(latitude,longitude).subscribe((chartData: any) => {
          this.updateChart(chartData);
          console.log('chart:',chartData)
          console.log('fetchWeatherData:',this.fetchWeatherData)
        });
      
      };

  
  updateChart(chartData:any){
      const labels = chartData.time;
      const temperatureData = chartData.hourly.temperature_2m;
      const cloudCoverageData = chartData.hourly.cloudcover_mid;


      this.chart=new Chart("MyChart", {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature(C)",
              data: temperatureData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(255, 99, 132)',
            },
            {
              label: "Cloud Coverage(%)",
              data: cloudCoverageData,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(54, 162, 235)',
            }
          ]
        },
        options: {
          aspectRatio:2.5,
          scales: {
            y: {
              grid: {
                color: 'rgba(0,0,0,0.1)',
              }
            },
            x: {
              grid:{
                color: 'rgba(0,0,0,0.1)',
              }
            }
          },
          plugins:{
            tooltip:{
              backgroundColor:'rgba(0,0,0,0.7)',
              bodyFont:{
                size:14,
              },
              titleFont:{
                size:16,
                weight:'bold',
              }
            },
            legend:{
              labels:{
                font:{
                  size:14,
                }
              }
            },
          }
        }
      });
    }
  }

