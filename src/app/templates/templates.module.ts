import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopdetailsComponent } from './shopdetails/shopdetails.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalModule } from '../Global/global.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ShopdetailsComponent
  ],
  imports: [
      BarRatingModule,
      CommonModule,
      RouterModule,
      MatButtonModule, 
      FlexLayoutModule,
      MatCardModule, 
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
      GlobalModule,
      NgSelectModule,
      FormsModule,
      GoogleMapsModule, 
      NgxPaginationModule
  ],
  exports: [
    // ProductGridComponent,
    // DialogContentProductDiferentStore,
    //DialogContentProductDiferentStoreDetail,
    // Grid3Component,
    // ReviewComponent,
    ShopdetailsComponent,
    MatPaginatorModule, 
    // ProductStoreGridComponent
 ]
})
export class TemplatesModule { }
