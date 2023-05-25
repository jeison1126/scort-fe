import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InvoicesRoutes } from './invoices-routing.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicevalidationComponent } from './invoicevalidation/invoicevalidation.component';
import { BinnancesidebaradmComponent } from '../shared/binnancesidebaradm/binnancesidebaradm.component';


@NgModule({
  declarations: [InvoicesComponent, InvoicevalidationComponent, BinnancesidebaradmComponent ],
  imports: [
    MatSidenavModule,
		FormsModule,
		ReactiveFormsModule,
		MatBadgeModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatTableModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		FlexLayoutModule,
		MatPaginatorModule,
		RouterModule.forChild(InvoicesRoutes),
		MatExpansionModule,
		SweetAlert2Module.forRoot(),
		MatProgressBarModule,
		MatCheckboxModule,
		FormsModule
  ],
	exports: [
		MatProgressBarModule
	]
})
export class InvoicesModule { }
