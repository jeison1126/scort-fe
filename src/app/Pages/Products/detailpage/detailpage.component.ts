import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {

  id: any;
   type: any;
   apiResponse: any;
   singleProductData: any;
   productsList: any;
   productsGrid: any;     
   get_pr: any[] = [];

   constructor(private route: ActivatedRoute,
      private router: Router,
      public embryoService: EmbryoService,
      private apiService: ApiService,) {
   }

   ngOnInit() {
            
      this.route.params.subscribe((res:any) => {
         this.id = res.id;
         this.type = res.type;
      })
      this.apiService.getProductsbyId(this.id).subscribe((res:any) => this.getProductData(res));
   }

   getProductData(response:any) {
                  

      let gallery = response.rel_product;
      this.get_pr = [];
      for (var i = 0; i < gallery.length; i++) {
         let image_route = gallery[i].image;
         this.get_pr[i] = image_route;
      }

      let myObj_product; 
      myObj_product = { 
         availablity: response.availability,
         brand: response.brand,
         category: "Jewellery",
         category_type: "accessories",
         color: "Black",
         description: response.description_product,
         discount_price: response.discount_price,
         id: response.id_product,
         image: environment.api.baseBucketImageUrl + response.image,
         image_gallery: this.get_pr,
         name: response.name_product,
         popular: false,
         price: response.total_price,
         product_code: response.product_code,
         stock: response.stock,
         rating: response.rating,
         store_id: response.store,
         status: true,
         type: "accessories",
         quantity: 1,
         valid_quant:1,
         age:response.age,
         location: response.location.loaction,
         getRate : this.getRate(response.rel_prodrate)              
      };
      this.productsGrid = myObj_product;      
   }

   getRate(rates:any){            
      for (var i = 0; i < rates.length; i++) {
         if(rates[i].order_rate == 3){
             return rates[i].total_price;  
         }
      }
      // if(rates[2]){
      //    return rates[2].total_price;
      // }else{
      //    return "";
      // }
   }

   // public getData() {
   //    this.embryoService.getProducts().valueChanges().subscribe(res => this.checkResponse(res));
   // }

   // public checkResponse(response) {
   //    this.productsList = null;
   //    this.productsList = response[this.type];
   //    for (let data of this.productsList) {
   //       if (data.id == this.id) {
   //          console.log("single");
   //          console.log(data);
   //          this.singleProductData = data;
   //          break;
   //       }
   //    }
   // }

   public addToCart(value:any) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value:any) {
      this.embryoService.addToWishlist(value);
   }


}
