import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { AdminPanelRoutes } from './adminpanel-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GlobalModule } from '../Global/global.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenulistitemsComponent } from './shared/menulistitems/menulistitems.component';
import { MenuItems } from './Core/menu/MenuItems/MenuItems';

@NgModule({
  declarations: [
    SidebarComponent,
	MenulistitemsComponent,
	HeaderComponent
  ],
  imports: [
    FormsModule,
		ReactiveFormsModule,
    //MatFormField,
		CommonModule,
		//MenuToggleModule,
		MatButtonModule,
		MatCardModule,
		MatMenuModule,
		FlexLayoutModule,
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
		PerfectScrollbarModule,
		RouterModule.forChild(AdminPanelRoutes),
		/* TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: TranslateLoader,
				deps: [HttpClient]
			}
		}), */
		HttpClientModule,
		GlobalModule,
		//ToastaModule.forRoot()
  ],
	providers: [
		MenuItems
	],
	exports: [
		RouterModule,
		//ToastaModule
	]
})
export class AdminpanelModule { }
