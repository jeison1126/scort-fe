import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicevalidationComponent } from './invoicevalidation/invoicevalidation.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }

export const InvoicesRoutes: Routes = [
	{
		path      : '',
		component : InvoicesComponent
	},
	{
		path: 'validation_invoice/:id_invoice',
		component: InvoicevalidationComponent
	},
];

