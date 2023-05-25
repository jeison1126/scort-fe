import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { EmbryoService } from 'src/app/Services/embryo.service';

@Component({
  selector: 'app-paymentdetailsidebar',
  templateUrl: './paymentdetailsidebar.component.html',
  styleUrls: ['./paymentdetailsidebar.component.css']
})
export class PaymentdetailsidebarComponent implements OnInit {

  artProducts  : any;
   popupResponse : any;

   constructor(public embryoService: EmbryoService,
               private loadingBar: LoadingBarService) { }

   ngOnInit() {
   }

   public calculateTotalPrice() {
      let subtotal = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            subtotal += (product.price *product.quantity) ;
         }
      }
      return subtotal;
   }

   public removeProduct(value:any) {
      let message = "Are you sure you want to delete this product?";
      this.embryoService.confirmationPopup(message).
         subscribe(res => {this.popupResponse = res},
                   err => console.log(err),
                   ()  => this.getPopupResponse(this.popupResponse, value)
                  );
   }

   public getPopupResponse(response: any, value:any) {
      if(response){
         this.embryoService.removeLocalCartProduct(value);
         this.embryoService.paymentSidenavOpen = false;
      }
   }

   public calculateProductSinglePrice(product:any, value: any) {
      let price = 0;
      product.quantity = value;
      price = product.price*value;
      return price;
   }

   public getTotalPrice() {
      let total = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            total += (product.price*product.quantity);
         }
         // total += (this.embryoService.shipping+this.embryoService.tax);
      }
      return total;
   }

   close() {     
    //   this.sidenav.close();
      this.embryoService.paymentSidenavOpen = !this.embryoService.paymentSidenavOpen;
    }

}
