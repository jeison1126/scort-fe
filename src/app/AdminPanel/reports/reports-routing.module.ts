import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetModule } from '../Widget/widget.module';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [];

export const ReportsRoutes: Routes = [
	{
		path      : '',
		component : ReportsComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
		RouterModule.forChild(ReportsRoutes),
		TranslateModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatTableModule,
		MatMenuModule,
		MatDividerModule,
		WidgetModule,
		MatTabsModule,
    MatChipsModule,
    FlexLayoutModule
  ],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
