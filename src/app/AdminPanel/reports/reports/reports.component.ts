import { Component, OnInit } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  tableTabData        : any;
  buySellChartContent : any;
  chartData           : any;

  displayedTransactionColumns : string [] = ['transid','date','account', 'type', 'amount','debit', 'balance'];

  displayedTransferColumns : string [] = ['transid','date','account', 'type', 'amount', 'balance','status'];

  displayedExpenseColumns : string [] = ['itmNo','date', 'type','companyName','amount','status'];
 
  constructor(private service : AdminPanelServiceService) {
  }

  ngOnInit() {
     this.service.getTableTabContent().valueChanges().subscribe((res:any) => this.tableTabData = res);
     this.service.getBuySellChartContent().valueChanges().
           subscribe( (res:any) => (this.getChartData(res))
                    );

  }

  //getChartData method is used to get the chart data.
  getChartData(data:any){
     this.buySellChartContent= data;
     this.chartDataChange('week');
  }

  //chartDataChange method is used to change the chart data according to button event.
  chartDataChange(tag:any){
     if(this.buySellChartContent && this.buySellChartContent.length>0)
     for(var content of this.buySellChartContent){
        if(content.tag == tag){
           this.chartData = content;
        }
     }
  }

}
