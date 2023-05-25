import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnChanges {

   @Input() wishListProducts : any;

   @Input() count!          : number;

   @Input() currency!      : string;

   @Output() removeWishListData : EventEmitter<any> = new EventEmitter();

   @Output() addAllWishlistToCart : EventEmitter<any> = new EventEmitter();

   @Output() addToCart: EventEmitter<any> = new EventEmitter();

   hiddenBadge = true;

   constructor(
      private router: Router,
   ) { }

   ngOnInit() {
   }

   ngOnChanges() {
      if(this.count && this.count != 0) {
         this.hiddenBadge = false;
      } else {
         this.hiddenBadge = true;
      }
   }

   public confirmationPopup(product:any) {
      this.removeWishListData.emit(product);
   }

   public addAllToCart() {
      this.addAllWishlistToCart.emit(this.wishListProducts);
   }

   public calculatePrice(product: any) {
      let total = null;
      total = product.price*product.quantity;
      return total;
   }

   public addToCartProduct(product: any) {
      this.addToCart.emit(product);
   }

   public gotoDtail(product_id:any) {
      let route = '/products/accessories/'+product_id
      this.router.navigate([route])
      .then(() => {
         window.location.reload();
      });
   }

}
