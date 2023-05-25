import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicestoreRoutingModule } from './invoicestore-routing.module';
import { InvoicestoreComponent } from './invoicestore/invoicestore.component';



@NgModule({
  declarations: [
    InvoicestoreComponent
  ],
  imports: [
    CommonModule,
    InvoicestoreRoutingModule
  ]
})
export class InvoicestoreModule { }
