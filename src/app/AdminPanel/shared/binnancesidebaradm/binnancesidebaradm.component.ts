import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BalanceDetail } from 'src/app/Models/Invoice';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';

export interface Observacions {
  observation: any,
}

@Component({
  selector: 'app-binnancesidebaradm',
  templateUrl: './binnancesidebaradm.component.html',
  styleUrls: ['./binnancesidebaradm.component.scss']
})
export class BinnancesidebaradmComponent {

   cartProducts: any;
   popupResponse: any;
   balanceGrid: BalanceDetail[] = [];
   allbalanceGrid: any;
   get_balance: BalanceDetail[] = [];
   get_balances: BalanceDetail[] = [];
   balance_store: any;

   get_observations: Observacions[] = [];
   observation: any;
   id_invoice: any;
   allorbservationGrid: any;
   searchValue: any = '';
   public show: boolean = false;
    
   public obser = new FormControl('', Validators.required);
   public newForm = new FormGroup({
      obser: this.obser,
   });

   constructor(
      private router: Router,
      public embryoService: EmbryoService,
      private apiService: ApiService,
      private loadingBar: LoadingBarService) { }

   ngOnInit() {
      this.id_invoice = localStorage.getItem('id_invoice_popup');
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
      this.embryoService.binnacleSidenavAdmOpen = !this.embryoService.binnacleSidenavAdmOpen;
   }

   getTotalPrice() {
      return 20000;
   }

   getData() {
      let mes = localStorage.getItem('messajes');
      let obj = JSON.parse(mes!); 
      if(obj){
         return obj;
      }   
   }

   sendBinnacle() {   
      this.show = false;
      var observation = (document.getElementById("message") as HTMLInputElement).value      
      if(observation!=""){
         const id_store = localStorage.getItem('id-store');
         let type = "adm"
         let user_id = localStorage.getItem('id-user');
         let id_invoice_popup = localStorage.getItem('id_invoice_popup');
         let myObjCreateBinnacle = {
            'observation': observation,
            'user_id': user_id,
            'id_invoice_popup': id_invoice_popup,
            'type': type
         };
         this.apiService.createBinnacle(myObjCreateBinnacle).subscribe(
            result => {
               let id_invoice = Number(localStorage.getItem('id_invoice_popup'));
               this.apiService.getBinnacle(id_invoice, 'adm').subscribe(
                  (result:any) => {
                     localStorage.removeItem("messajes");
                     let myJSONinvDetail = JSON.stringify(result.data);
                     localStorage.setItem('messajes', myJSONinvDetail);
                     this.getData()
                  }
               );
            }
         );         
      }else{
         console.log("no existe");
         this.show = true;
      }
             

   }

}
