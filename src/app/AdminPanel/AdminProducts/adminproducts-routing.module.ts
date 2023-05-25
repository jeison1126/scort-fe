import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminproductsComponent } from './adminproducts/adminproducts.component';

const routes: Routes = [
  {
		path: '',
		component: AdminproductsComponent,
		children: [
			{
				path: 'admin_products',
				component: AdminproductsComponent
			},
		]
	},
	// {
	// 	path: 'create_store',
	// 	component: AddStoreComponent,
	// 	children: [
	// 		{
	// 			path: 'create_store',
	// 			component: AddStoreComponent
	// 		},
	// 	]
	// },	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminproductsRoutingModule { }
