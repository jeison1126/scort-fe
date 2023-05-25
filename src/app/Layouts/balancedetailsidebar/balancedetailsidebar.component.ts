import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BalanceDetail } from 'src/app/Models/Invoice';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';

@Component({
  selector: 'app-balancedetailsidebar',
  templateUrl: './balancedetailsidebar.component.html',
  styleUrls: ['./balancedetailsidebar.component.css']
})
export class BalancedetailsidebarComponent implements OnInit{

  cartProducts: any;
   popupResponse: any;
   balanceGrid: BalanceDetail[] = [];
   allbalanceGrid: any;
   get_balance: BalanceDetail[] = [];
   get_balances: BalanceDetail[] = [];
   balance_store: any;

   constructor(
      private router: Router,
      public embryoService: EmbryoService,
      private apiService: ApiService,
      private loadingBar: LoadingBarService) { }

   ngOnInit() {
      
      const id_store = localStorage.getItem('id-store');
      this.get_balances = [];
      // this.apiService.getBalanceDetail(id_store).subscribe(
      //    response => {
      //       let myJSON = JSON.stringify(response);
      //       let obj = JSON.parse(myJSON);
            
      //       for (var i = 0; i < obj.data.length; i++) {
      //          console.log(obj.data[i].id);
      //          this.get_balances.push({
      //             id: obj.data[i].id,
      //             created_at: obj.data[i].created_at,
      //             reference: obj.data[i].reference,
      //             state: obj.data[i].state,
      //             total_balance: obj.data[i].total_balance,
                 
      //          });

      //       }
      //       this.allbalanceGrid = this.get_balances;            
      //    },
      //    error => {
      //       console.log(error)
      //    }
      // );

      // this.apiService.GetBalanceAccount(id_store).subscribe(res => this.getBalanceAcountData(res));

   }

   getBalanceAcountData(response:any) {
		let myJSONbalance = JSON.stringify(response);
		let objTrx = JSON.parse(myJSONbalance);

		if (objTrx.data.total_balance__sum) {
			this.balance_store = objTrx.data.total_balance__sum;
		} else {
			this.balance_store = 0;
		}

	}

   close() {
      this.embryoService.balanceSidenavOpen = !this.embryoService.balanceSidenavOpen;
   }

   getTotalPrice(){
      return 20000;
   }

}
