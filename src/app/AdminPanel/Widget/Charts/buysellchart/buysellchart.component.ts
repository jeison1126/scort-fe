import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buysellchart',
  templateUrl: './buysellchart.component.html',
  styleUrls: ['./buysellchart.component.css']
})
export class BuysellchartComponent implements OnInit {

   @Input() color :any;
   @Input() label :any;
   @Input() data  :any;
   showChart!: boolean;
   //line chart options
	public lineChartOptions :any = {
      responsive: true,
      maintainAspectRatio: false,
		scales: {
         yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            }
          }],
         xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            }
         }]
      },
		tooltip: {
			enabled: true
		},
		legend: {
			display: false
		},
	}

	constructor() { }

	ngOnInit() {	
      setTimeout(()=>{
         this.showChart = true;
      },0)
	}

}
