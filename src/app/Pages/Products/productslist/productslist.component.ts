import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';
import { environment } from 'src/environments/environment';

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
  age: string;
  location: string;
}

export interface Store {
  id_store: string;
  name_store: string;
  state_store: string;
  city: string;
  logo_store: string;
  route_store: string;
  description: string;
}

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.scss']
})
export class ProductslistComponent implements OnInit  {

  // public config: SwiperConfigInterface = {
   //    a11y: true,
   //    direction: 'horizontal',
   //    slidesPerView: 1,
   //    keyboard: true,
   //    mousewheel: true,
   //    scrollbar: false,
   //    navigation: true,
   //    pagination: false,
   //    observer: true,
   //    observeParents: true
   // };
   config: any = {
    spaceBetween: 0,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    autoplay: {
       delay: 2500,
       disableOnInteraction: false,
    },
    pagination: {
       el: '.swiper-pagination',
       clickable: true,
    },
    navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
    },
 };



 get_product: Prod[] = [];
 get_store: Store[] = [];
 loaded = false;
 type: any;
 pips: boolean = true;
 tooltips: boolean = true;
 category: any;
 pageTitle!: string | null;
 subPageTitle!: string | null;;
 p: any;
 validate_age: any;

 @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

 storeGrid: Store[] = [];
 obsStore!: Observable<any>;
 dataSourceStore = new MatTableDataSource<Store>(this.storeGrid);

 productsGrid: Prod[] = [];
 product: any;
 obs!: Observable<any>;
 dataSource = new MatTableDataSource<Prod>(this.productsGrid);

 public validate_img: boolean = false;
 public validate_map: boolean = false;
 public validate_serv: boolean = false;
 public validate_paid: boolean = false;
 public validate_membership: boolean = false;

 public subscribers: any = {};

 constructor(private route: ActivatedRoute,
    private router: Router,
    public embryoService: EmbryoService,
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private cookieService: CookieService
 ) {

 }

 storelist: Prod[] = [];
 ngOnInit() {

    

    this.route.params.subscribe(params => {
       this.route.queryParams.forEach(queryParams => {
          this.getPageTitle();
          this.validate_age = this.cookieService.get('validate_age');
          console.log(this.validate_age);
          if (this.validate_age != 'true') {
             this.apiService.stablishPopUpHome();
          }


       });   
    });
    let latbsr = sessionStorage.getItem('latbsr');
    let lonbsr = sessionStorage.getItem('lonbsr');
    let kilometersnear = sessionStorage.getItem('kilometersnear');
    let string_search = sessionStorage.getItem('string_search');
    let filter_code = sessionStorage.getItem('filter_code');
    let filter_price_min = sessionStorage.getItem('filter_price_min');
    let filter_price_max = sessionStorage.getItem('filter_price_max');
    let filter_year_min = sessionStorage.getItem('filter_year_min');
    let filter_year_max = sessionStorage.getItem('filter_year_max');
    let filter_check_wp = sessionStorage.getItem('filter_check_wp');
    let filter_items_serv = sessionStorage.getItem('filter_items_serv');
    let filter_items_qua = sessionStorage.getItem('filter_items_qua');


    if (latbsr && lonbsr && kilometersnear && filter_code) {
       // geocorde + filter
       console.log("geocorde + filter");
       this.apiService.getProductsByGeocordeFilterWithoutAuth(filter_code, filter_price_min, filter_price_max, filter_year_min, filter_year_max, filter_check_wp, filter_items_qua, filter_items_serv, latbsr, lonbsr, kilometersnear).subscribe((res:any) => this.getProductFilter(res));
    }
    else if (string_search && filter_code) {
       // search + filter
       console.log("search + filter");
       this.apiService.getProductsBySearchFilterWithoutAuth(filter_code, filter_price_min, filter_price_max, filter_year_min, filter_year_max, filter_check_wp, filter_items_qua, filter_items_serv, string_search).subscribe((res:any) => this.getProductFilter(res));
    }
    else if (latbsr && lonbsr && kilometersnear && string_search) {
       //geocorde + search
       console.log("geocorde + search");
       this.apiService.getProductsBySearchWithoutAuth(string_search).subscribe((res:any) => this.getProductFilter(res));
    } else if (latbsr && lonbsr && kilometersnear) {
       //geocorde
       console.log("geocorde");
       this.apiService.getProductsByGeocordeWithoutAuth(latbsr, lonbsr, kilometersnear).subscribe((res:any) => this.getProductFilter(res));
    } else if (string_search) {
       //search
       console.log("search");
       this.apiService.getProductsBySearchWithoutAuth(string_search).subscribe((res:any) => this.getProductFilter(res));
    } else if (filter_code) {
       // filter
       console.log("filter");
       this.apiService.getProductsByFilterWithoutAuth(filter_code, filter_price_min, filter_price_max, filter_year_min, filter_year_max, filter_check_wp, filter_items_qua, filter_items_serv).subscribe((res:any) => this.getProductFilter(res));
    }
    else {
       console.log("nada");
       this.apiService.getProductsWithoutAuth().subscribe((res:any) => this.getProductData(res));
    }

    const store = Number(localStorage.getItem('id-store'));
    if (store) {
       this.apiService.getStoreData(store).subscribe((res:any) => {
          this.getDataStore(res)
       }, (error:any) => console.log(error));
    }


    // this.apiService.getStoreWithoutAuth().subscribe(res => this.getStoreData(res));
 }


 getDataStore(response:any) {
       
    if (response.logo_store) {
       this.validate_img = false;
    } else {
       this.validate_img = true;
    }
    if (response.serqu == 1) {
       this.validate_serv = true;
    } else {
       this.validate_serv = false;
    }
    if (response.latbox == null) {
       this.validate_map = true;
    } else {
       this.validate_map = false;
    }
    if (response.paid_ad == false){
       this.validate_paid = true;
    }else{
       this.validate_paid = false;
    }

    if (response.status_store == 3){
       this.validate_membership = true;
    }else{
       this.validate_membership = false;
    }
 }



 mostrarbanner1() {
    document.getElementById("bannershow1")!.classList.add('hide');
 }

 mostrarbanner2() {
    document.getElementById("bannershow2")!.classList.add('hide');
 }

 getRate(rates:any) {
    for (var i = 0; i < rates.length; i++) {
       if(rates[i].order_rate == 3){
           return rates[i].total_price;  
       }
    }
    // if (rates[2]) {
    //    return rates[2].total_price;
    // } else {
    //    return "";
    // }
 }

 getLocation(location:any) {
    if (location) {
       return location.loaction;
    } else {
       return "";
    }
 }

 getProductData(response:any) {

    this.get_product = [];
    let reco
    if (response.length < 12) {
       reco = response.length;
    } else {
       reco = 30;
    }

    for (var i = 0; i < reco; i++) {

       let getRate = this.getRate(response[i].rel_prodrate);
       let get_image = environment.api.baseBucketImageUrl + response[i].image;
       let get_name_product = response[i].name_product;
       let get_total_price = response[i].total_price;
       let get_produc_code = response[i].product_code;
       let get_brand = response[i].brand;
       let get_product_code = response[i].product_code;
       let get_discount_price = response[i].discount_price;
       let get_id_product = response[i].id_product;
       let get_id_store = response[i].store;
       let get_age = response[i].age;
       let location = this.getLocation(response[i].location);


       // console.log(location);

       this.get_product.push({
          image: get_image,
          name: get_name_product,
          price: getRate,
          produc_code: get_produc_code,
          brand: get_brand,
          product_code: get_product_code,
          discount_price: get_discount_price,
          id_product: get_id_product,
          id_store: get_id_store,
          route_product: '/products/accessories/' + get_id_product,
          age: get_age,
          location: location
       });
    }

    this.productsGrid = this.get_product;
    this.dataSource = new MatTableDataSource<Prod>(this.productsGrid);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    // console.log(this.productsGrid);

 }


 getProductFilter(response:any) {
    this.get_product = [];
    for (var i = 0; i < response.length; i++) {
       this.get_product.push({
          image: environment.api.baseBucketImageUrl + response[i].image,
          name: response[i].name_product,
          price: response[i].getRate,
          produc_code: response[i].produc_code,
          brand: response[i].brand,
          product_code: response[i].product_code,
          discount_price: "",
          id_product: response[i].id_product,
          id_store: response[i].store,
          route_product: '/products/accessories/' + response[i].id_product,
          age: response[i].age,
          location: response[i].location
       });
    }
    console.log(this.get_product);

    this.productsGrid = this.get_product;
    this.dataSource = new MatTableDataSource<Prod>(this.productsGrid);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

 }

 // getStoreData(response) {

 //    this.storeGrid = null;
 //    this.get_store = [];

 //    let length
 //    if (response.length < 12) {
 //       length = response.length;
 //    } else {
 //       length = 12;
 //    }

 //    for (var i = 0; i < length; i++) {

 //       let get_id_store = response[i].id_store;
 //       let get_name_store = response[i].name_store;
 //       let get_state_store = response[i].state_store;
 //       let get_city = response[i].city;
 //       let get_logo_store = response[i].logo_store;
 //       let get_description = response[i].description;

 //       this.get_store.push({
 //          id_store: get_id_store,
 //          name_store: get_name_store,
 //          state_store: get_state_store,
 //          city: get_city,
 //          logo_store: environment.api.baseBucketImageUrl + response[i].logo_store_up,
 //          route_store: '/storefront/' + get_id_store,
 //          description: get_description,

 //       });
 //    }
 //    this.storeGrid = this.get_store;
 //    // console.log(this.storeGrid);

 //    this.dataSourceStore = new MatTableDataSource<Store>(this.storeGrid);
 //    this.changeDetectorRef.detectChanges();
 //    this.dataSourceStore.paginator = this.paginator;
 //    this.obsStore = this.dataSourceStore.connect();

 // }


 public onLoad() {
    this.loaded = true;
 }

 public checkCartAlready(singleProduct:any) {
    let products = JSON.parse(localStorage.getItem("cart_item")!) || [];
    if (!products.some((item:any) => item.name == singleProduct.name)) {
       return true;
    }else{return false;}
 }

 public productAddToWishlist(value: any) {
    this.embryoService.addToWishlist(value);
 }

 public addToCartProduct(value: any) {

    let myObj_product = {
       "brand": value.brand,
       "discount_price": value.discount_price,
       "id_product": value.id_product,
       "id_store": value.id_store,
       "name": value.name,
       "price": value.price,
       "produc_code": value.produc_code,
       "quantity": 1,
       "canti": 1,
       "image": value.image,
       "route_product": value.route_product
    };

    let products = JSON.parse(localStorage.getItem("cart_item")!) || [];
    if (products.length > 0) {

       this.embryoService.addToCart(myObj_product);

       // let id_store_storage;
       // for (var i = 0; i < 1; i++) {
       //     id_store_storage = products[i].id_store;
       // }
       // console.log(id_store_storage);
       // console.log(value.store_id);
       // if (id_store_storage == value.store_id) {
       //     this.embryoService.addToCart(value);
       // }
       // else {
       //     //   const dialogRef = this.dialog.open(DialogContentProductDiferentStoreDetail, {
       //     //      width: '500px',
       //     //    });      
       //     //   dialogRef.afterClosed().subscribe(result => {
       //     //      console.log(`Dialog result: ${result}`);
       //     //   });
       // }
    } else {
       this.embryoService.addToCart(myObj_product);
    }

 }



 public getPageTitle() {
    this.pageTitle = null;
    this.subPageTitle = null;

    switch (this.type || this.category) {
       case undefined:
          this.pageTitle = "Store";
          // this.subPageTitle = "Explore your favourite fashion style.";
          break;

       // case "gadgets":
       //    this.pageTitle = "Gadgets";
       //    this.subPageTitle="Check out our new gadgets.";
       //    break;

       // case "accessories":
       //    this.pageTitle = "Accessories";
       //    this.subPageTitle="Choose the wide range of best accessories.";
       //    break;

       // default:
       //    this.pageTitle = "Products";
       //    this.subPageTitle = null;
       //    break;
    }
 }

 public addToCart(value:any) {

    console.log(value);

    let myObj_product = {
       "brand": value.brand,
       "discount_price": value.discount_price,
       "id_product": value.id_product,
       "id_store": value.id_store,
       "name": value.name,
       "price": value.price,
       "produc_code": value.produc_code,
       "quantity": 1,
       "image": value.image,
       "route_product": value.route_product
    };

    this.embryoService.addToCart(myObj_product);
 }

 public addToWishList(value:any) {
    this.embryoService.addToWishlist(value);
 }

 extendGridStructure() {
    this.router.navigate(['/storelist']);
 }

 MapRoute() {
    this.router.navigate(['/account/mapslocation']).then(() => {
       location.reload();
    });
 }


}
