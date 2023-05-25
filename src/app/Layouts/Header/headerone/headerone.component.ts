import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoadscriptsService } from 'src/app/loadscripts.service';
import { ApiService } from 'src/app/Services/api.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MatTreeNestedDataSource} from '@angular/material/tree';
import { environment } from 'src/environments/environment';
import { EmbryoService } from 'src/app/Services/embryo.service';


export interface Prod {
  image: string;
  name: string;
  price: string;
  produc_code: string;
  brand: string;
  product_code: string;
  discount_price: string;
  id_product: string;
  route_product: string;
  id_store: string;
}

export interface InfoLocat {
  ubi: any;
}

export interface InfoProd {
  nameprod: any;
}

interface subcategoryNode {
  id: number;
  name_category: string;
  children?: subcategoryNode[];
}


@Component({
  selector: 'app-headerone',
  templateUrl: './headerone.component.html',
  styleUrls: ['./headerone.component.scss']
})
export class HeaderoneComponent {

   get_product: Prod[] = [];
   toggleActive: boolean = false;
   cartProducts: any;
   popupResponse: any;
   wishlistProducts: any;
   //treeControl = new NestedTreeControl<subcategoryNode>(node => node.children);
   dataSourceTree = new MatTreeNestedDataSource<subcategoryNode>();
   category: InfoProd[] = [];
   get_categories: subcategoryNode[] = [];
   id_store: any;
   id: any;
   address: any;
   description: any;
   email: any;
   logo_store: any;
   logo_store_up: any;
   manager: any;
   name_store: any;
   number_identifier: any;
   state_store: any;
   telephone: any;
   id_departament: any;
   id_city: any;
   id_category: any;
   logo_store_save: any;
   city: any;
   department: any;
   public validate_img: boolean = false;
   public validate_map: boolean = false;
   public validate_serv: boolean = false;
   
   isDisabled = true;
   public show_sp: boolean = false;
   timer = 0;
   ngDropdown: any;

   productsGrid: any;
   url = "/products/accessories/118";

   // Variables to search
   //products;
   startAt = new Subject()
   endAt = new Subject()
   lastkeypress: number = 0;

   myControl = new FormControl();
   options: string[] = [];
   data: any;


   public show: boolean = false;
   public show_add: boolean = false;
   public show_store_pr: boolean = false;
   public show_acces_store: boolean = false;
   public show_acces_sell: boolean = false;
   public show_info: boolean = true;

   constructor(
      public embryoService: EmbryoService,
      private apiService: ApiService,
      private router: Router,
      private _LoadScript: LoadscriptsService,
      private loader: LoadingBarService,
   ) {
      _LoadScript.Carga(["maps/getLocation"]);
   }

   ngOnInit() {

      this.addBodyClass();

      this.apiService.getStoreCategories().subscribe((res:any) => this.getCategoriesMenu(res, this.id));
      const token_front = localStorage.getItem('mr-token-front');
      const id_type_user = localStorage.getItem('id_type_user');
      const store = localStorage.getItem('id-store');
      const kilometersnear = sessionStorage.getItem('kilometersnear');
      const latbsr = sessionStorage.getItem('latbsr');
      const lonbsr = sessionStorage.getItem('lonbsr');

      if (kilometersnear && latbsr && lonbsr) {
         this.isDisabled = false;
         this.show_sp = false;
         this.ngDropdown = kilometersnear;
      }

      this.id_store = store;
      if (token_front) {
         this.show_add = false;
         if (id_type_user == "2") {
            // it's a store                
            this.show_store_pr = true;
            this.apiService.getStoreData(this.id_store).subscribe((res:any) => {
               this.getDataStore(res)
            }, (error:any) => console.log(error));
         } else {
            // it's not a store
            this.show = true;
         }
         if (store == "null") {
            this.show_acces_sell = true;
         } else {
            this.show_acces_store = true;
         }
      } else {
         this.show = false;
         this.show_store_pr = false;
         this.show_add = true;
         this.show_acces_store = false;
         this.show_acces_sell = true;
      }
   }


   addBodyClass() {

      window.addEventListener('load', function () {
         let body = document.querySelector('body')
         if(body){
          body.classList.add("loaded")
         }
      });


   /*    $(document).ready(function () {
         // menu click event
         $('.menuBtn').click(function () {
            $('.fixedheader').addClass('absoluted');

            $(this).toggleClass('act');
            if ($(this).hasClass('act')) {
               $('.mainMenu').addClass('act');
            }
            else {
               $('.mainMenu').removeClass('act');
            }
         });
      });  */


   }


   getDataStore(response:any) {
      this.address = response.address;
      this.description = response.description;
      this.email = response.email;
      this.logo_store = response.logo_store;
      this.manager = response.manager;
      this.name_store = response.name_store;
      this.number_identifier = response.number_identifier;
      this.state_store = response.state_store;
      this.telephone = response.telephone;
      this.id_departament = response.id_departament;
      this.id_city = response.city_id;
      this.id_category = response.storecategories;

      if (this.logo_store) {
         this.validate_img = false;
      } else {
         this.validate_img = true;
      }
      if(response.serqu==1){
         this.validate_serv = true;
      }else{
         this.validate_serv = false;
      }
      if(response.latbox==null){
         this.validate_map = true;
      }else{
         this.validate_map = false;
      }
    
   //    public validate_map: boolean = false;
   // public validate_serv: boolean = false;

      this.city = response.city;
      this.department = response.departament;
      this.category = response.storecategories_description;

   }

   exit_store_front() {
      localStorage.removeItem('mr-token-front');
      localStorage.removeItem('id_type_user');
      localStorage.removeItem('id_user_front');
      localStorage.removeItem('mr-token');
      localStorage.removeItem('id-store');
      localStorage.removeItem('id-user');
      localStorage.removeItem('user_email');
      localStorage.removeItem('personal_name');
      localStorage.removeItem('LocationDetail');
      localStorage.removeItem('firebase');
      this.router.navigate(['/session/signin']).then(() => {
         window.location.reload();
      });;

   }

   filterView() {
      this.router.navigate(['/search']).then(() => {
         window.location.reload();
      });;
   }


   public toggleSearch() {
    let appmain = document.querySelector('app-main')
    if(appmain){
      appmain.classList.toggle('form-open');
    }
   }

   public toggleSidebar() {
      this.embryoService.sidenavOpen = !this.embryoService.sidenavOpen;
   }

   public openConfirmationPopup(value: any) {
      let message = "Estas seguro de eliminar este item?";
      this.embryoService.confirmationPopup(message).
         subscribe(res => { this.popupResponse = res },
            err => console.log(err),
            () => this.getPopupResponse(this.popupResponse, value, 'cart')
         );
   }

   public getPopupResponse(response: any, value: any, type:any) {
      if (response) {
         if (type == 'cart') {
            this.embryoService.removeLocalCartProduct(value);
         } else {
            this.embryoService.removeLocalWishlistProduct(value);
         }
      }
   }

   public addAllWishlistToCart(values: any) {
      this.embryoService.addAllWishListToCart(values);
   }

   public openWishlistConfirmationPopup(value: any) {
      let message = "Are you sure you want to add all products?";
      this.embryoService.confirmationPopup(message).
         subscribe(res => { this.popupResponse = res },
            err => console.log(err),
            () => this.getPopupResponse(this.popupResponse, value, 'wishlist')
         );
   }

   public selectedCurrency(value:any) {
      this.embryoService.currency = value;
   }

   public selectedLanguage(value:any) {
      this.embryoService.language = value;
   }

   public addToCart(value:any) {
      this.embryoService.addToCart(value, 'wishlist');
   }

   public search($event:any) {
      if ($event.timeStamp - this.lastkeypress > 200) {
         // console.log($event.target.value);
         this.apiService.getProductsWithoutAuth().subscribe((res:any) => this.getProductData(res));
      }
      this.lastkeypress = $event.timeStamp
   }



   getPosts(string_search:any) {
      sessionStorage.removeItem('kilometersnear');
      sessionStorage.removeItem('latbsr');
      sessionStorage.removeItem('lonbsr');
      sessionStorage.setItem('string_search', string_search);
      this.router.navigate(['/home/'])
         .then(() => {
            window.location.reload();
         });
   }

   getPostsEnter(event:any) {
      sessionStorage.removeItem('kilometersnear');
      sessionStorage.removeItem('latbsr');
      sessionStorage.removeItem('lonbsr');
      let string_search = this.myControl.value;
      sessionStorage.setItem('string_search', string_search);
      this.router.navigate(['/home/'])
         .then(() => {
            window.location.reload();
         });
   }

   public updated(event:any) {
      let key_arrow = event.keyCode;
      if (key_arrow == 37 || key_arrow == 38 || key_arrow == 39 || key_arrow == 40) {
         return false;
      } else {
         this.options = [];
         if (this.myControl.value.length > 0) {
            this.apiService.FilterLoctions(this.myControl.value).subscribe(
               (data: InfoLocat[]) => {
                  let all = []
                  for (var i in data) {
                     let get_name_ubi = data[i]['ubi'];
                     all.push(get_name_ubi);
                  }
                  let searchedWord = this.myControl.value
                  for (let key in all) {
                     let r = all[key].search(new RegExp(searchedWord, "i"));
                     if (r != -1) {
                        this.options.push(all[key])
                     }
                  }

               },
               (error:any) => console.log(error)
            );
            // this.apiService.FilterProducts(this.myControl.value).subscribe(
            //    (data: InfoProd[]) => {
            //       let all = []
            //       for (var i in data) {
            //          let get_name_product = data[i]['name_product'];
            //          all.push(get_name_product);
            //       }
            //       let searchedWord = this.myControl.value
            //       for (let key in all) {
            //          let r = all[key].search(new RegExp(searchedWord, "i"));
            //          if (r != -1) {
            //             this.options.push(all[key])
            //             console.log(this.options);   
            //          }
            //       }
            //    },
            //    error => console.log(error)
            // );

         } else {
            this.options = []
         }
         return false;
      }
   }


   getCategoriesMenu(response:any, id_store:number) {
      this.get_categories = [];
      for (var i = 0; i < response.length; i++) {
         // let subcategor = this.createSubcategories(response[i].rel_categories, id_store);
         this.get_categories.push(
            {
               id: response[i].id,
               name_category: response[i].name_category

            });
      }

      this.dataSourceTree.data = this.get_categories;
      // console.log(this.dataSourceTree.data);
   }


   getProductData(response:any) {
      this.get_product = [];

      let length
      if (response.length < 12) {
         length = response.length;
      } else {
         length = 12;
      }

      for (var i = 0; i < length; i++) {
         let get_image = environment.api.baseBucketImageUrl + response[i].image;
         let get_name_product = response[i].name_product;
         let get_total_price = response[i].total_price;
         let get_produc_code = response[i].product_code;
         let get_brand = response[i].brand;
         let get_product_code = response[i].product_code;
         let get_discount_price = response[i].discount_price;
         let get_id_product = response[i].id_product;
         let get_id_store = response[i].store;
         this.get_product.push({
            image: get_image,
            name: get_name_product,
            price: get_total_price,
            produc_code: get_produc_code,
            brand: get_brand,
            product_code: get_product_code,
            discount_price: get_discount_price,
            id_product: get_id_product,
            id_store: get_id_store,
            route_product: '/products/accessories/' + get_id_product
         });
      }
      // console.log(this.get_product);
      this.productsGrid = this.get_product;
   }

   public RouteAssitedSelling() {
      this.router.navigate(['/account/assisted_selling']).then(() => {
         window.location.reload();
      });
   }

   activateSelect() {
      this.show_sp = true;
      sessionStorage.removeItem('string_search');
      setInterval(() => {
         this.isDisabled = false;
         this.show_sp = false;
         this.ngDropdown = 1;
         sessionStorage.setItem('kilometersnear', "1");
         this.router.navigate(['/home/'])
            .then(() => {
               window.location.reload();
            });
      }, 10000)
   }

   finByLocation(event:any) {
      console.log(event);
      sessionStorage.setItem('kilometersnear', event);
      this.router.navigate(['/home/'])
         .then(() => {
            window.location.reload();
         });
   }

   doSomething($event: any) {
      $event.stopPropagation();
      //Another instructions
   }


   routeinicio() {
      this.router.navigate(['/home/'])
         .then(() => {
            // $('.mainMenu').removeClass('act');
            window.location.reload();
         });
   }

   routesell(){
      this.router.navigate(['/sell'])
         .then(() => {
            // $('.mainMenu').removeClass('act');
            window.location.reload();
         });
   }

   routerlegalinfo(){
      this.router.navigate(['/terms_conditions'])
      .then(() => {
         // $('.mainMenu').removeClass('act');
         window.location.reload();
      });
   }

   RouteUbication(){
      this.router.navigate(['/account/mapslocation'])
      .then(() => {
         // $('.mainMenu').removeClass('act');
         window.location.reload();
      });
   }
}
