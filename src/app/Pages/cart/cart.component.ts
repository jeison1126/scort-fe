import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { EmbryoService } from 'src/app/Services/embryo.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked  {
  
  products       : any;
  quantityArray  : number[] = [1,2,3,4,5,6,7,8,9,10];
  popupResponse  : any;

  constructor(public embryoService : EmbryoService, 
              private router: Router,
              private loadingBar: LoadingBarService,
              private cdRef : ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() : void {
     this.cdRef.detectChanges();
  }

  public removeProduct(value:any) {
    let message = "Are you sure you want to delete this product?";
    this.embryoService.confirmationPopup(message).
       subscribe(res => {this.popupResponse = res},
                 err => console.log(err),
                 ()  => this.getPopupResponse(this.popupResponse, value)
                );
 }

 public getPopupResponse(response:any, value:any) {
    if(response){
       this.embryoService.removeLocalCartProduct(value);
    }
 }

 public calculateProductSinglePrice(product:any, value: any) {            
    let price = 0;
    product.quantity = value;               
    price = product.price*value;
    return price;
 }
 

 public calculateTotalPrice() {
    let subtotal = 0;
    if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
       for(let product of this.embryoService.localStorageCartProducts) {
          subtotal += (product.price *product.quantity);
       }
       return subtotal;
    }
    return subtotal;
    
 }

 public getTotalPrice() {
    let total = 0;
    if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
       for(let product of this.embryoService.localStorageCartProducts) {
          total += (product.price*product.quantity);
       }
       // total += (this.embryoService.shipping+this.embryoService.tax);
       // return total;
    }

    return total;
    
 }

 public updateLocalCartProduct() {
    this.embryoService.updateAllLocalCartProduct(this.embryoService.localStorageCartProducts);
    this.router.navigate(['/checkout']).then(() => {
       window.location.reload();
   });
 }

 public getQuantityValue(product:any) {  
    
       
    // return product.canti

    if(product.quantity) {
       return product.quantity
    } else {
       return 1;
    }
 }
}
