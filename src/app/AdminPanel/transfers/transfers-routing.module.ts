import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersComponent } from './transfers/transfers.component';

const routes: Routes = [];



export const AdminProductsRoutes: Routes = [

	{
		path: '',
		component: TransfersComponent,
		children: [
			{
				path: 'admin_transfers',
				component: TransfersComponent
			},
		]
	},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TransfersRoutingModule {
  
 }
