import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';
import { Observacions } from '../binnancesidebaradm/binnancesidebaradm.component';

@Component({
  selector: 'app-transferdetailadmsidebar',
  templateUrl: './transferdetailadmsidebar.component.html',
  styleUrls: ['./transferdetailadmsidebar.component.scss']
})
export class TransferdetailadmsidebarComponent implements OnInit  {

  get_observations: Observacions[] = [];  
   val_request :any;
   val_transfer :any;
   refer_transfer: any;

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
      
   }

   close() {
      this.embryoService.TransfersDetailAdmSidebarOpen = !this.embryoService.TransfersDetailAdmSidebarOpen;
   }

   getTotalPrice() {
      return 20000;
   }

   getData() {      
      this.val_request = localStorage.getItem('val_request');
      this.val_transfer = localStorage.getItem('val_transfer');
      this.refer_transfer = localStorage.getItem('refer_transfer');      
      let medetTrs = localStorage.getItem('detail_transfer');
      let obj = JSON.parse(medetTrs!); 
      if(obj){
         return obj;
      }   
   }

   sendBinnacle() {
      this.show = false;
      var observation = (document.getElementById("message") as HTMLInputElement).value
      if(observation!=""){
         const id_store = localStorage.getItem('id-store');
         console.log(id_store);
         let type = "st" 
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
               this.apiService.getBinnacle(id_invoice, 'st').subscribe(
                  (result:any) => {
                     localStorage.removeItem("messajes");
                     let myJSONinvDetail = JSON.stringify(result);
                     localStorage.setItem('messajes', myJSONinvDetail);
                     this.getData()
                  }
               );
            }
         );
      }else{
         this.show = true;
      }
   }

}
