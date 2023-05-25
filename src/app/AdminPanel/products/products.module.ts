import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ProductsRoutes } from 'src/app/Pages/Products/Products.routing';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalModule } from 'src/app/Global/global.module';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AddproductComponent,
    EditproductComponent
  ],
  imports: [
      CommonModule,
      FlexLayoutModule,
      MatSidenavModule,
      MatIconModule,
      MatCheckboxModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatMenuModule,
      // MatOptionModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatDividerModule,
      MatListModule,
      RouterModule.forChild(ProductsRoutes),
      TranslateModule,
      MatPaginatorModule,
      MatSortModule,
      MatGridListModule,
      GlobalModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMatSelectSearchModule,
      NgxDropzoneModule,
      MatProgressSpinnerModule,      
      MatToolbarModule,
      NgxPaginationModule,
      NgSelectModule
  ]
})
export class ProductsModule { }
