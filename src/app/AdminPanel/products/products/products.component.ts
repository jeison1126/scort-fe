import { ChangeDetectorRef, Component, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
const { isArray } = Array;


export interface Prod {
	image: string;
	name: string;
	price: string;
	produc_code: string;
	brand: string;
	product_code: string;
	discount_price: string;
	id_product: any;
}

export interface Card {
    title: string;
    subtitle: string;
    text: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  get_menu: Prod[] = [];
	productsList: any;
	// productsGrid: any;
	popUpDeleteUserResponse: any;
	showType: string = 'grid';
	displayedProductColumns: string[] = ['id', 'image', 'name', 'brand', 'category', 'product_code', 'discount_price', 'price', 'action'];
	
	@ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort!: MatSort;
	productsGrid: Prod[] = [];
	dataSource = new MatTableDataSource<Prod>(this.productsGrid);
	obs!: Observable<any>;

	/* toastdeleteproduct: ToastOptions = {
		title: "Producto eliminado",
		msg: "El producto o servicio a sido eliminado!",
		showClose: true,
		timeout: 8000,
		theme: "material"
	};

	toastfaildeleteproduct: ToastOptions = {
		title: "Fallo eliminacion",
		msg: "Fallo eliminación del producto o servicio contacte con el administrador!",
		showClose: true,
		timeout: 8000,
		theme: "material"
	}; */

	constructor(public translate: TranslateService,
		private router: Router,
		private adminPanelService: AdminPanelServiceService,
		private apiService: ApiService,
		private cookieService: CookieService,
		private toastyService: ToastrService,
		private changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		const id_store = Number(localStorage.getItem('id-store'));
		this.apiService.getProductsbyStoreid(id_store).subscribe((res:any) => this.getProductData(res));
	}

	getProductData(response:any) {
		this.productsGrid = [];
		this.get_menu = [];
		for (var i = 0; i < response.length; i++) {
			let get_image = environment.api.baseBucketImageUrl + response[i].image;
			let get_name_product = response[i].name_product;
			let get_total_price = response[i].total_price;
			let get_produc_code = response[i].product_code;
			let get_brand = response[i].brand;
			let get_product_code = response[i].product_code;
			let get_discount_price = response[i].discount_price;
			let get_id_product = response[i].id_product;
			this.get_menu.push({
				image: get_image,
				name: get_name_product,
				price: get_total_price,
				produc_code: get_produc_code,
				brand: get_brand,
				product_code: get_product_code,
				discount_price: get_discount_price,
				id_product: get_id_product
			});
		}
		this.productsGrid = this.get_menu;

		this.dataSource = new MatTableDataSource<Prod>(this.productsGrid);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
		this.obs = this.dataSource.connect();
		

	}
	

	//getProductResponse method is used to get the response of all products.
	public getProductResponse(response:any) {
		let products = ((response.men.concat(response.women)).concat(response.gadgets)).concat(response.accessories);
	}

	/**
  * productShowType method is used to select the show type of product.
  */
	productShowType(type:any) {
		this.showType = type;
		if (type == 'list') {
			document.getElementById('list')!.classList.add("active");
			document.getElementById('grid')!.classList.remove('active');
			this.productsList = new MatTableDataSource(this.productsGrid);
			setTimeout(() => {
				this.productsList.paginator = this.paginator;
				this.productsList.sort = this.sort;
			}, 0)


		}
		else {

			this.dataSource = new MatTableDataSource<Prod>(this.productsGrid);
			this.changeDetectorRef.detectChanges();
			this.dataSource.paginator = this.paginator;
			this.obs = this.dataSource.connect();
			
			document.getElementById('grid')!.classList.add("active");
			document.getElementById('list')!.classList.remove('active');
		}
	}

	/**
	  * onEditProduct method is used to open the edit page and edit the product.
	  */
	onEditProduct(data:any) {
		console.log(data.id_product);
		
		this.router.navigate(['/admin-panel/product-edit', data.type, data.id_product]);
		this.adminPanelService.editProductData = data;
	}

	/* 
     *deleteProduct method is used to open a delete dialog.
     */
	deleteProduct(i:any) {				
		this.adminPanelService.deleteDialog("Estas seguro de eliminar este produto permanentemente?").
			subscribe(res => { this.popUpDeleteUserResponse = res },
				err => console.log(err),
				() => this.getDeleteResponse(this.popUpDeleteUserResponse, i))
	}

	applyFilter(filterValue: string) {
		this.productsList.filter = filterValue.trim().toLowerCase();
		if (this.productsList.paginator) {
		   this.productsList.paginator.firstPage();
		}
	 }

	/**
	  * getDeleteResponse method is used to delete a product from the product list.
	  */
	getDeleteResponse(response: string, i:any) {	
		if (response == "yes") {
			if (this.showType == 'grid') {
				let id_product = this.productsGrid[i];
				id_product = i.id_product;
				this.apiService.deleteProduct(id_product).subscribe(
					(result:any) => {
						if (result["result"] == 200) {
							window.location.reload();
							// this.productsGrid.splice(i, 1);							
							// this.dataSource = new MatTableDataSource<Prod>(this.productsGrid);						
							// this.changeDetectorRef.detectChanges();
							// this.dataSource.paginator = this.paginator;
							// this.obs = this.dataSource.connect();
							// this.toastyService.success(this.toastdeleteproduct);
							
						} else {
							//this.toastyService.error(this.toastfaildeleteproduct);
						}
					},
					error => console.log(error)
				);
			} else if (this.showType == 'list') {
				let id_product = this.productsGrid[i];
				id_product = id_product;
				this.apiService.deleteProduct(id_product).subscribe(
					result => {
						if (result == 200) {
							window.location.reload();					
							// this.productsList.data.splice(i, 1);
							// this.productsList = new MatTableDataSource(this.productsList.data);
							// this.productsList.paginator = this.paginator;
							// this.toastyService.success(this.toastdeleteproduct);
						} else {
							//this.toastyService.error(this.toastfaildeleteproduct);
						}
					},
					error => console.log(error)
				);


			}
		}
	}
}

// CLASS TO FILTER AND PAGINATE
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    get_product: Prod[] = [];
    productsGrid: any;
    id: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    transform(posts: Card[], find: string): Card[] {
        this.route.params.subscribe((res:any) => {
            this.id = res.id;
        })
		// this.apiService.getProductStoresbyStoreid(this.id).subscribe(res => this.getProductData(res, posts, find, this.id));
		const id_store = Number(localStorage.getItem('id-store'));
		this.apiService.getProductsbyStoreid(id_store).subscribe((res:any) => this.getProductData(res, posts, find, id_store));
        if (!posts) return [];
        if (!find) return posts;
        find = find.toLowerCase();
        return search(this.productsGrid, find);
    }

    getProductData(response:any, posts:any, find:any, store_id:any) {
        this.get_product = [];
		for (var i = 0; i < response.length; i++) {
			let get_image = environment.api.baseBucketImageUrl + response[i].image;
			let get_name_product = response[i].name_product;
			let get_total_price = response[i].total_price;
			let get_produc_code = response[i].product_code;
			let get_brand = response[i].brand;
			let get_product_code = response[i].product_code;
			let get_discount_price = response[i].discount_price;
			let get_id_product = response[i].id_product;
			this.get_product.push({
				image: get_image,
				name: get_name_product,
				price: get_total_price,
				produc_code: get_produc_code,
				brand: get_brand,
				product_code: get_product_code,
				discount_price: get_discount_price,
				id_product: get_id_product
			});
		}        
        this.productsGrid = this.get_product;
    }
}


function search(entries: any[], search: string) {

    search = search.toLowerCase();

    return entries.filter(function (obj) {
        const keys: string[] = Object.keys(obj);
        return keys.some(function (key) {
            const value = obj[key];
            if (isArray(value)) {
                return value.some(v => {
                    return v.toLowerCase().includes(search);
                });
            }
            else if (!isArray(value)) {
                return value.toString().toLowerCase().includes(search);
            }
        })
    });

}
