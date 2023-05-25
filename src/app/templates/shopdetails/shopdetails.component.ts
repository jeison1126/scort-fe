import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';

@Component({
  selector: 'app-shopdetails',
  templateUrl: './shopdetails.component.html',
  styleUrls: ['./shopdetails.component.css']
})
export class ShopdetailsComponent implements OnInit, OnChanges {

  title = 'gmaps';
   position : any;
   label = {
      color:'red',
      text: 'Marcador'
   };

   @Input() detailData: any;
   @Input() currency!: string;

   mainImgPath!: string;
   totalPrice: any;
   type: any;
   colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
   sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
   quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   productReviews: any;
   public validate_canti: boolean = false;
   id_store: any;
   address: any;
   description: any;
   email: any;
   logo_store: any;
   validate_logo: any;
   manager: any;
   name_store: any;
   state_store: any;
   telephone: any;
   id_departament: any;
   id_city: any;
   id_location: any;
   id_category: any;
   logo_store_save: any;
   city: any;
   locations: any;
   department: any;
   category: any;
   CheckedValidwp: any = false;
   rates: any;
   schedule: any;
   services: any;
   qualities: any;
   @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
   public validate_maps: boolean = true;

   constructor(private route: ActivatedRoute,
      private router: Router,
      public embryoService: EmbryoService,
      public dialog: MatDialog,
      private apiService: ApiService,
   ) {

   }

   ngOnInit() {
      console.log(this.detailData.image);
      
      this.mainImgPath = this.detailData.image;
      this.totalPrice = this.detailData.price;
      this.route.params.subscribe((res:any) => {
         this.type = null;
         this.type = res.type;
      });

      this.apiService.getStoreData(this.detailData.store_id).subscribe((res:any) => {
         this.apiService.getRates(res.product_id).subscribe((rat:any) => {
            this.apiService.getScheduleData(res.id_store).subscribe((sch:any) => {
               this.apiService.getServiceProd(res.product_id).subscribe((ser:any) => {
                  this.apiService.getQualityProd(res.product_id).subscribe((qa:any) => {
                     this.apiService.getGeocordenates(res.id_store).subscribe(
                        (data_geo:any) => {
                        
                           this.getDataStore(res)
                           this.rates = rat;
                           this.schedule = sch.data;
                           this.services = ser;
                           this.qualities = qa;  

                           if(!data_geo.data.latitude){
                              this.validate_maps = false;
                           }

                           this.position = {
                              lat : parseFloat(data_geo.data.latitude),
                              lng: parseFloat(data_geo.data.longitude)
                           };                 
                        }
                    );
                  }, (error:any) => console.log(error));
               }, (error:any) => console.log(error));
            }, (error:any) => console.log(error));
         }, (error:any) => console.log(error));
      }, (error:any) => console.log(error));

   }


   getDataStore(response:any) {
      this.id_category = response.storecategories_description;
      this.CheckedValidwp = response.whatsapp;

   }


   ngOnChanges() {
      this.mainImgPath = null!;
      this.totalPrice = null;
      this.mainImgPath = this.detailData.image;
      this.totalPrice = this.detailData.price;
   }

   /**
    * getImagePath is used to change the image path on click event. 
    */
   public getImagePath(imgPath: string, index: number) {
      document.querySelector('.border-active')!.classList.remove('border-active');
      this.mainImgPath = imgPath;
      document.getElementById(index + '_img')!.className += " border-active";
   }

   public calculatePrice(detailData: any, value: any) {
      detailData.valid_quant = value;
      if (!value) {
         value = 1;
         detailData.valid_quant = 0;
      }
      detailData.quantity = value;
      if (value <= detailData.stock) {
         this.totalPrice = detailData.price * value;
      } else {
         this.totalPrice = detailData.price;
      }
   }

   public reviewPopup(detailData:any) {
      let reviews: any = null;
      for (let review of this.productReviews) {
         reviews = review.user_rating;
      }

   }

   public addToWishlist(value: any) {
      this.embryoService.addToWishlist(value);
   }

   public addToCart(value: any) {

      this.validate_canti = false;

      if (value.valid_quant == 0) {
         this.validate_canti = true;
      } else {
         let myObj_product = {
            "brand": value.brand,
            "discount_price": value.discount_price,
            "id_product": value.id,
            "id_store": value.store_id,
            "name": value.name,
            "price": value.price,
            "produc_code": value.product_code,
            "quantity": value.quantity,
            "canti": value.quantity,
            "image": value.image,
            "route_product": "na",
            "stock": value.stock
         };

         let products = JSON.parse(localStorage.getItem("cart_item")!) || [];
         if (products.length > 0) {
            this.embryoService.addToCart(myObj_product);

            // let id_store_storage;
            // for (var i = 0; i < 1; i++) {
            //    id_store_storage = products[i].id_store;
            // }         
            // console.log(id_store_storage);      
            // console.log(value.store_id);
            // if (id_store_storage == value.store_id) {
            //    this.embryoService.addToCart(value);
            // }
            // else {
            //    const dialogRef = this.dialog.open(DialogContentProductDiferentStoreDetail, {
            //       width: '500px',
            //     });      
            //    dialogRef.afterClosed().subscribe(result => {
            //       console.log(`Dialog result: ${result}`);
            //    });
            // }
         } else {
            this.embryoService.addToCart(myObj_product);
         }
         // this.embryoService.addToCart(value);
      }
   }

}
