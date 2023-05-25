import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { AddstoreComponent } from './addstore/addstore.component';
import { EditstoreComponent } from './editstore/editstore.component';
import { StoreComponent } from './store/store.component';
import { StorevalidationComponent } from './storevalidation/storevalidation.component';


@NgModule({
  declarations: [
    AddstoreComponent,
    EditstoreComponent,
    StoreComponent,
    StorevalidationComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
