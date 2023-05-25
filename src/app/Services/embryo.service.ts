import { EventEmitter, Injectable, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { ReviewpopupComponent } from '../Global/reviewpopup/reviewpopup.component';
import { ConfirmationpopupComponent } from '../Global/confirmationpopup/confirmationpopup.component';
import { AddcartComponent } from '../AdminPanel/Widget/PopUp/addcart/addcart.component';
import { ShowcartdataComponent } from '../AdminPanel/Widget/PopUp/showcartdata/showcartdata.component';


interface Response {
  data: any;
}

export interface Product {
  name: string;
  image: string;
  price: string;
  produc_code: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmbryoService {

   sidenavOpen: boolean = false;
   paymentSidenavOpen: boolean = false;
   ubicationSidenavOpen: boolean = false;
   balanceSidenavOpen: boolean = false;
   binnacleSidenavOpen: boolean = false;
   binnacleSidenavAdmOpen: boolean = false;
   TransfersDetailSidebarOpen: boolean = false;
   TransfersDetailAdmSidebarOpen: boolean = false;
   isDirectionRtl: boolean = false;
   featuredProductsSelectedTab: any = 0;
   newArrivalSelectedTab: any = 0;
   currency: string = 'USD';
   language: string = 'en';
   shipping: number = 12.95;
   tax: number = 27.95;
   // products: AngularFireObject<any>;
   localStorageCartProducts: any;
   localStorageWishlist: any;
   navbarCartCount: number = 3;
   navbarWishlistProdCount = 0;
   buyUserCartProducts: any;
   get_product_data: Product | undefined;

   constructor(
      private spinnerService: NgxSpinnerService,
      private http: HttpClient,
      private dialog: MatDialog,
      // private db: AngularFireDatabase,
      private toastyService: ToastrService,
      //private toastConfig: ToastrConfig
      ) 
      {

      //this.toastyConfig.position = "top-right";
      //this.toastyConfig.theme = "material";
      this.calculateLocalWishlistProdCounts();
      this.calculateLocalCartProdCounts();
      localStorage.removeItem("user");
      localStorage.removeItem("byProductDetails");

      // this.db.object("products").valueChanges().subscribe(res => { this.setCartItemDefaultValue(res['gadgets'][1]) });
   }

   public llamarSpinner() {
      this.spinnerService.show();
   }

   public detenerSpinner() {

      setTimeout(() => {
         this.spinnerService.hide();
      }, 2000); // 5 seconds
   }



   public setCartItemDefaultValue(setCartItemDefaultValue: any) {
      let products: any;
      products = JSON.parse(localStorage.getItem("cart_item")!) || [];
      let found = products.some(function (el:any, index:number) {
         if (el.name == setCartItemDefaultValue.name) {
            return true;
         }
         else{
            return false;
         }
      });
      if (!found) { products.push(setCartItemDefaultValue); }
      this.calculateLocalCartProdCounts();
   }

   public reviewPopup(singleProductDetails: any, reviews: any) {
      let review: MatDialogRef<ReviewpopupComponent>;
      const dialogConfig = new MatDialogConfig();
      if (this.isDirectionRtl) {
         dialogConfig.direction = 'rtl';
      } else {
         dialogConfig.direction = 'ltr';
      }

      review = this.dialog.open(ReviewpopupComponent, dialogConfig);
      review.componentInstance.singleProductDetails = singleProductDetails;
      review.componentInstance.reviews = reviews;

      return review.afterClosed();
   }

   public confirmationPopup(message: string) {
      let confirmationPopup: MatDialogRef<ConfirmationpopupComponent>;
      confirmationPopup = this.dialog.open(ConfirmationpopupComponent);
      confirmationPopup.componentInstance.message = message;
      return confirmationPopup.afterClosed();
   }

   public getProducts() {
      // this.products = this.db.object("products");
      // return this.products;
   }


   public addCartPopup(data: any) {
      let dialogRef_sta: MatDialogRef<AddcartComponent>;
      dialogRef_sta = this.dialog.open(AddcartComponent);
      dialogRef_sta.componentInstance.data = data;
      return dialogRef_sta.afterClosed();
   }


   public ShowCartDataFinaly(data: any, total: any) {
      let dialogRef_sta: MatDialogRef<ShowcartdataComponent>;
      dialogRef_sta = this.dialog.open(ShowcartdataComponent);
      dialogRef_sta.componentInstance.data = data;
      dialogRef_sta.componentInstance.total = total;
      return dialogRef_sta.afterClosed();
   }

   /*
      ----------  Cart Product Function  ----------
   */
   // Adding new Product to cart in localStorage
   public addToCart(data: any, type: any = "") {
      let products: any;
      products = JSON.parse(localStorage.getItem("cart_item")!) || [];
      let productsLength = products.length;
      /* let toastOption: ToastOptions = {
         title: "Agregando producto",
         msg: "Producto agregado",
         showClose: true,
         timeout: 1000,
         theme: "material"
      }; */
      let found = products.some(function(el:any, index:number) {
         if (el.name == data.name) {
            if (!data.quantity) { data.quantity = 1 }
            products[index]['quantity'] = data.quantity;
            return true;
         }
         else{
            return false;
         }
      });
      if (!found) { products.push(data); }
      if (productsLength == products.length) {
         //toastOption.title = "Producto ya fue agregado";
         //toastOption.msg = "Ya agregaste este producto al carrito";
      }
      if (type == 'wishlist') {
         this.removeLocalWishlistProduct(data);
      }

      this.get_product_data = {
         name: data.name,
         image: data.image,
         price: data.price,
         produc_code: data.produc_code
      };
      this.addCartPopup(this.get_product_data);

      setTimeout(() => {
         localStorage.setItem("cart_item", JSON.stringify(products));
         this.calculateLocalCartProdCounts();
      }, 500);
   }

   public buyNow(data: any) {
      let products: any;
      products = JSON.parse(localStorage.getItem("cart_item")!) || [];

      let found = products.some(function (el:any, index:number) {
         if (el.name == data.name) {
            if (!data.quantity) { data.quantity = 1 }
            products[index]['quantity'] = data.quantity;
            return true;
         }
         else{
            return false;
         }
      });
      if (!found) { products.push(data); }

      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calculateLocalCartProdCounts();
   }

   public updateAllLocalCartProduct(products: any) {
      localStorage.removeItem('cart_item');
      localStorage.setItem("cart_item", JSON.stringify(products))
   }

   // returning LocalCarts Product Count
   public calculateLocalCartProdCounts() {
      this.localStorageCartProducts = null;
      this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")!) || [];
      this.navbarCartCount = +((this.localStorageCartProducts).length);
   }

   // Removing cart from local
   public removeLocalCartProduct(product: any) {
      let products: any = JSON.parse(localStorage.getItem("cart_item")!);

      for (let i = 0; i < products.length; i++) {
         if (products[i].id === product.id) {
            products.splice(i, 1);
            break;
         }
      }

      /* let toastOption: ToastOptions = {
         title: "Eliminando producto",
         msg: "Producto eliminado del carrito",
         showClose: true,
         timeout: 1000,
         theme: "material"
      }; */

      //this.toastyService.wait(toastOption);
      setTimeout(() => {
         // ReAdding the products after remove
         localStorage.setItem("cart_item", JSON.stringify(products));
         this.calculateLocalCartProdCounts();
      }, 500);
   }

   /*
      ----------  Wishlist Product Function  ----------
   */

   // Adding new Product to Wishlist in localStorage
   public addToWishlist(data: any) {
      /* let toastOption: ToastOptions = {
         title: "Adding Product To Wishlist",
         msg: "Product adding to the wishlist",
         showClose: true,
         timeout: 1000,
         theme: "material"
      }; */

      let products: any;
      products = JSON.parse(localStorage.getItem("wishlist_item")!) || [];
      let productsLength = products.length;

      let found = products.some(function (el:any, index:number) {
         if (el.name == data.name) {
            if (!data.quantity) { data.quantity = 1 }
            products[index]['quantity'] = data.quantity;
            return true;
         }
         else {
            return false;
         }
      });
      if (!found) { products.push(data); }

      if (productsLength == products.length) {
         //toastOption.title = "Product Already Added";
         //toastOption.msg = "You have already added this product to wishlist";
      }

      //this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.setItem("wishlist_item", JSON.stringify(products));
         this.calculateLocalWishlistProdCounts();
      }, 500);

   }

   // returning LocalWishlist Product Count
   public calculateLocalWishlistProdCounts() {
      this.localStorageWishlist = null;
      this.localStorageWishlist = JSON.parse(localStorage.getItem("wishlist_item")!) || [];
      this.navbarWishlistProdCount = +((this.localStorageWishlist).length);
   }


   // Removing Wishlist from local
   public removeLocalWishlistProduct(product: any) {
      let products: any = JSON.parse(localStorage.getItem("wishlist_item")!);

      for (let i = 0; i < products.length; i++) {
         if (products[i].productId === product.productId) {
            products.splice(i, 1);
            break;
         }
      }

     /*  const toastOption: ToastOptions = {
         title: "Remove Product From Wishlist",
         msg: "Product removing from wishlist",
         showClose: true,
         timeout: 1000,
         theme: "material"
      }; */


      //this.toastyService.wait(toastOption);
      setTimeout(() => {
         // ReAdding the products after remove
         localStorage.setItem("wishlist_item", JSON.stringify(products));
         this.calculateLocalWishlistProdCounts();
      }, 500);

   }

   public addAllWishListToCart(dataArray: any) {
      let a: any;
      a = JSON.parse(localStorage.getItem("cart_item")!) || [];

      for (let singleData of dataArray) {
         a.push(singleData);
      }

      /* let toastOption: ToastOptions = {
         title: "Adding All Product To Cart",
         msg: "Products adding to the cart",
         showClose: true,
         timeout: 1000,
         theme: "material"
      }; */

      //this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.removeItem('wishlist_item');
         localStorage.setItem("cart_item", JSON.stringify(a));
         this.calculateLocalCartProdCounts();
         this.calculateLocalWishlistProdCounts();
      }, 500);

   }

   /**
    * getBlogList used to get the blog list. 
    */
   public getBlogList() {
      let blogs: any;
      // blogs = this.db.list("blogs");
      return blogs;
   }

   /**
    * getContactInfo used to get the contact infomation. 
    */
   public getContactInfo() {
      let contact: any;
      // contact = this.db.object("contact");
      return contact;
   }

   /**
    * getTermCondition used to get the term and condition. 
    */
   public getTermCondition() {
      let termCondition: any;
      // termCondition = this.db.list("term_condition");
      return termCondition;
   }

   /**
    * getPrivacyPolicy used to get the privacy policy.
    */
   public getPrivacyPolicy() {
      let privacyPolicy: any;
      // privacyPolicy = this.db.list("privacy_policy");
      return privacyPolicy;
   }

   /**
    * getFaq used to get the faq.
    */
   public getFaq() {
      let faq: any;
      // faq = this.db.object("faq");
      return faq;
   }

   /**
    * getProductReviews used to get the product review.
    */
   public getProductReviews() {
      let review: any;
      // review = this.db.list("product_reviews");
      return review;
   }

   /**
    * Buy Product functions 
    */
   public addBuyUserDetails(formdata:any, num_aprob:number, date:Date, reference:any) {

      let InvoiceDetail = { "num_aprob": num_aprob, "date": date, "reference": reference };
      localStorage.setItem("InvoiceDetail", JSON.stringify(InvoiceDetail));

      localStorage.setItem("user", JSON.stringify(formdata));

      let product = JSON.parse(localStorage.getItem("cart_item")!)
      localStorage.setItem("byProductDetails", JSON.stringify(product));
      this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails")!)

      localStorage.removeItem("cart_item");
      this.calculateLocalCartProdCounts();
   }

   public removeBuyProducts() {
      localStorage.removeItem("byProductDetails");
      this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails")!)
   }

   /**
    * getTeam used to get the team data.
    */
   public getTeam() {
      let team: any;
      // team = this.db.list("team");
      return team;
   }

   /**
    * getTestimonial used to get the testimonial data.
    */
   public getTestimonial() {
      let testimonial: any;
      // testimonial = this.db.object("testimonial");
      return testimonial;
   }

   /**
    * getMissionVision used to get the Mission and Vision data.
    */
   public getMissionVision() {
      let mission_vision: any;
      // mission_vision = this.db.list("mission_vision");
      return mission_vision;
   }

   /**
    * getAboutInfo used to get the about info data.
    */
   public getAboutInfo() {
      let about_info: any;
      // about_info = this.db.object("about_info");
      return about_info;
   }

   @Output() disparador: EventEmitter<any> = new EventEmitter();
   @Output() disparador_status: EventEmitter<any> = new EventEmitter();
}
