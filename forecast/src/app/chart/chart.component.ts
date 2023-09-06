import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public chart:any;

  constructor(){}
  ngOnInit(): void {
    this.createChart();
  }

 createChart(){
    this.chart=new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "Temperature(C) in Lahore",
            data: [13, 16, 21, 28, 32, 34, 32, 31, 30, 26, 20, 14],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: "Cloud Coverage(%) in Lahore",
            data: [26, 29, 31, 24, 10, 3, 14, 16, 4, 5, 14, 23],
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
    });
  }
}