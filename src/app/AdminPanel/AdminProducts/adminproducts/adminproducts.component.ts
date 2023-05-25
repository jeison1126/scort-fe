import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from 'src/app/Models/Products';
import { ApiService } from 'src/app/Services/api.service';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.scss']
})
export class AdminproductsComponent implements OnInit {

  adminprList: any[] = [];
	adminProductList: any[] = [];
	get_pr: any[] = [];
	productsGrid!: any;
	@ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator | null;

	dataSource = new MatTableDataSource<any>(this.adminProductList);
	displayedColumns: string[] = ['action','name_store', 'created_at', 'product_code', 'name_product', 'total_price', 'published', 'name_state'];

	constructor(
		private apiService: ApiService,
		public service: AdminPanelServiceService
	) { }

	ngOnInit() {
		this.apiService.getAdminProduct().subscribe(res => this.getProductsData(res));
	}

	getProductsData(response: any) {
		console.log(response);
		this.adminprList = response;
		this.dataSource = new MatTableDataSource<any>(this.adminprList);
		setTimeout(() => {
			this.dataSource.paginator = this.paginator;
		}, 0)
	}


	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}


	onSeeDialog(data:any) {
		this.apiService.getProductsConfirmbyId(data.id_product).subscribe((res:any) => this.getProductData(res));
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
			availablity: true,
			brand: response.brand,
			category: "Jewellery",
			category_type: "accessories",
			color: "Black",
			description: response.description_product,
			discount_price: response.discount_price,
			id: response.id_product,
			image: response.image,
			image_gallery: this.get_pr,
			name: response.name_product,
			popular: false,
			price: response.total_price,
			product_code: response.product_code,
			quantity: response.stock,
			rating: response.rating,
			store_id: response.store,
			status: true,
			type: "accessories",
			email: response.store.email,
		};
		this.productsGrid = myObj_product;
		console.log(this.productsGrid);
		this.apiService.PopUpAdminProductsValidate(this.productsGrid);
	}


}
