import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductsRoutes, TransactionsRoutingModule } from './transactions-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { GlobalModule } from 'src/app/Global/global.module';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(AdminProductsRoutes),
        CommonModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule,        
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatDividerModule,
        MatListModule,
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
        MatDatepickerModule,
        //BsDatepickerModule.forRoot(),
  ]
})
export class TransactionsModule { }
