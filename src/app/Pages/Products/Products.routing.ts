import { Routes } from '@angular/router';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { ProductslistComponent } from './productslist/productslist.component';
/* import { ProductsComponent } from './Products/Products.component';
import { EditProductComponent } from './EditProduct/EditProduct.component';
import { AddProductComponent } from './AddProduct/AddProduct.component'; */

export const ProductsRoutes: Routes = [
   { 
		path: '', 
		component: ProductslistComponent 
	},
	{
		path: ':type/:id',
		component: DetailpageComponent
	},
   { 
      path: ':type', 
      component: ProductslistComponent 
   }
];
