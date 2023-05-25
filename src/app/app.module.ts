import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';
import { BidiModule } from '@angular/cdk/bidi';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { AppRoutes } from './app-routing.module';
import { Routes } from '@angular/router';
import { GlobalModule } from './Global/global.module';
// import { MenuItems } from './Core/menu/menu-items/menu-items';

import { AppComponent } from './app.component';

// import { HeaderTwoComponent } from './Layouts/Header/HeaderTwo/HeaderTwo.component';
// import { HeaderThreeComponent } from './Layouts/Header/HeaderThree/HeaderThree.component';

// import { FooterTwoComponent } from './Layouts/Footer/FooterTwo/FooterTwo.component';

// import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
// import { HomeTwoComponent } from './Pages/Home/HomeTwo/HomeTwo.component';
// import { HomeThreeComponent } from './Pages/Home/HomeThree/HomeThree.component';

// import { NotFoundComponent } from './Pages/NotFound/NotFound.component';

// import { BinnacleSideBarComponent } from './Layouts/BinnacleSideBar/BinnacleSideBar.component';
// import { FixedHeaderComponent } from './Layouts/Header/FixedHeader/FixedHeader.component';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { CookieService } from 'ngx-cookie-service';
import { MainModule } from './Main/main.module';
// import { HeaderOneModule } from './Layouts/Header/HeaderOne/HeaderOne.module';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { StoredetailviewComponent } from './AdminPanel/Widget/PopUp/storedetailview/storedetailview.component';
import { MainComponent } from './Main/main.component';
import { HeaderoneComponent } from './Layouts/Header/headerone/headerone.component';
import { CartComponent } from './Pages/cart/cart.component';
import { AdminpanelModule } from './AdminPanel/adminpanel.module';
import { AuthModule } from './auth/auth.module';
import { PaymentdetailsidebarComponent } from './Layouts/paymentdetailsidebar/paymentdetailsidebar.component';
import { FooteroneComponent } from './Layouts/Footer/footerone/footerone.component';
import { UbicationdetailsidebarComponent } from './Layouts/ubicationdetailsidebar/ubicationdetailsidebar.component';
import { BalancedetailsidebarComponent } from './Layouts/balancedetailsidebar/balancedetailsidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderoneComponent,
    MainComponent,
    CartComponent,
    StoredetailviewComponent,
    PaymentdetailsidebarComponent,
    FooteroneComponent,
    UbicationdetailsidebarComponent,
    BalancedetailsidebarComponent
  ],
  imports: [
      BrowserModule.withServerTransition({appId: 'embryo-seo-pre'}),
      BrowserAnimationsModule,
      RouterModule.forRoot(AppRoutes, {onSameUrlNavigation: 'reload'}),
      GlobalModule,
      //TemplatesModule,
      MatButtonModule,
      FlexLayoutModule,
      MatCardModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatDatepickerModule,
      MatFormFieldModule,
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
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      // LoadingBarRouterModule,
      LoadingBarModule,
      MatCardModule,
      MatIconModule,
      ToastrModule.forRoot(),
      BidiModule,
      /* TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: TranslateLoader,
            deps: [HttpClient]
         }
      }), */
      // SlickCarouselModule,
      // PerfectScrollbarModule,
      // DeviceDetectorModule.forRoot(),
      AdminpanelModule,
      AuthModule,
      // HeaderOneModule,
      // NgxMatSelectSearchModule,
      MatAutocompleteModule,
      // SweetAlert2Module.forRoot(),
  ],
  providers: [],
  exports : [
    RouterModule,
    ToastrModule
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
