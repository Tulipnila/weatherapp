import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  
  public selectedCity=this.shareData.cityDetails.results[0].name;
  public chart:any;
  public chartLabels:string[]=[];
  public temperatureData = this.shareData.weatherDetails?.daily?.temperature_2m_max; 
  public cloudCoverageData= this.shareData.weatherDetails?.hourly?.cloudcover_high;

  constructor(private shareData:ShareDataService){}

  ngAfterViewInit(): void {
    this.setChartLabels();
    this.createChart();
  }
  setChartLabels(){
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate =new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      const formattedDate = nextDate.toLocaleDateString('en-US',{month:'short', day:'2-digit'});
      this.chartLabels.push(formattedDate);
    }
  }
  createChart(){
      if(this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart("myChart", {
        type: 'line',
        data: {
          labels:this.chartLabels,
          datasets: [
            {
              label: `Temperature(C) in ${this.selectedCity}`,
              data: this.temperatureData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(255, 99, 132)',
            },
            {
              label: `Cloud Coverage(%) in ${this.selectedCity}`,
              data: this.cloudCoverageData,
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
              beginAtZero:true,
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
      })
  }
}