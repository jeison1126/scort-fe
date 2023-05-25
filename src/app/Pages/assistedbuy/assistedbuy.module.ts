import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistedbuyRoutingModule } from './assistedbuy-routing.module';
import { AssistedbuyComponent } from './assistedbuy/assistedbuy.component';


@NgModule({
  declarations: [
    AssistedbuyComponent
  ],
  imports: [
    CommonModule,
    AssistedbuyRoutingModule
  ]
})
export class AssistedbuyModule { }
