import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [];

export const AdminProductsRoutes: Routes = [

	{
		path: '',
		component: TransactionsComponent,
		children: [
			{
				path: 'admin_transactions',
				component: TransactionsComponent
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
export class TransactionsRoutingModule { }
