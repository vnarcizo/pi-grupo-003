import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
} from "../../variables/charts";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  chartGavetas = {
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  //return '$' + value + 'k'
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
              content += label;
            }
            content += yLabel;
            return content;
          }
        }
      }
    },
    data: {
      labels: ["zero", "uma", "duas", "três"],
      datasets: [
        {
          label: "Sales",
          data: [50, 20, 30, 22],
          maxBarThickness: 100
        }
      ]
    }
  }

  constructor(private apollo: Apollo) {}

  ngOnInit() {

    var chartOrders = document.getElementById('chart-orders');

    
    parseOptions(Chart, chartOptions());

    var gavetas = ["0","1","2","3"];
    var retGavetas = [-1,-1,-1,-1];


    for (let index = 0; index < gavetas.length; index++) {
      const element = gavetas[index];

      var str = `{
        tumulo_aggregate(where: {numero_gaveta: {_eq: "$gaveta"}}) {
          aggregate {
            count
          }
        }
      }`
  
      str = str.replace("$gaveta",element)

      this.apollo
      .watchQuery({query: gql`${str}`})
      .valueChanges.subscribe((result: any) => {
        
        console.log(result)
        retGavetas[index] = result.data.tumulo_aggregate.aggregate.count;
        console.log(retGavetas)

        this.chartGavetas.data.datasets[0].data = retGavetas
       
        var ordersChart = new Chart(chartOrders, {
          type: 'bar',
          options: this.chartGavetas.options,
          data: this.chartGavetas.data
        });
        
      });
      
    }
  
  }

}
