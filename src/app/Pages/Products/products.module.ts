import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { NgAisModule } from 'angular-instantsearch';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductsRoutes } from './Products.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardContent, MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { BarRatingModule } from "ngx-bar-rating";
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductslistComponent } from './productslist/productslist.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { ShopdetailsComponent } from 'src/Templates/shopdetails/shopdetails.component';



@NgModule({
  bootstrap: [
	ProductslistComponent
  ],
  declarations: [
	ProductslistComponent,
    DetailpageComponent,
	ShopdetailsComponent
  ],
  imports: [
    CommonModule,
    //ProductsRoutingModule,
    BarRatingModule,
	LazyLoadImageModule,
	 NgxUsefulSwiperModule,
	CommonModule,
	RouterModule.forChild(ProductsRoutes),
	FlexLayoutModule,
	MatCardModule,
	MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatExpansionModule,
		MatSelectModule,
		MatSnackBarModule,
		MatTooltipModule,
		MatChipsModule,
		MatListModule,
		MatSidenavModule,
		MatTabsModule,
		MatProgressBarModule,
		MatCheckboxModule,
		MatSliderModule,
		MatRadioModule,
		MatDialogModule,
		MatGridListModule,
		MatCardModule,
		//TemplatesModule,
		FormsModule,
		NgxPaginationModule,
		NgxSpinnerModule,
  ]
})
export class ProductsModule { }
