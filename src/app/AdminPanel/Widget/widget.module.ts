import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationpredeterminedComponent } from './PopUp/locationpredetermined/locationpredetermined.component';
import { ShowcartdataComponent } from './PopUp/showcartdata/showcartdata.component';
import { InvoicedetailusrComponent } from './PopUp/invoicedetailusr/invoicedetailusr.component';
import { FailerrortransactiongatewayComponent } from './PopUp/failerrortransactiongateway/failerrortransactiongateway.component';
import { FailtransactiongatewayComponent } from './PopUp/failtransactiongateway/failtransactiongateway.component';
import { DeletelocationuserComponent } from './PopUp/deletelocationuser/deletelocationuser.component';
import { StoredetailviewComponent } from './PopUp/storedetailview/storedetailview.component';
import { TransactiondetailComponent } from './PopUp/transactiondetail/transactiondetail.component';
import { InvoicedetailComponent } from './PopUp/invoicedetail/invoicedetail.component';
import { TransactionresponseComponent } from './PopUp/transactionresponse/transactionresponse.component';
import { TransferComponent } from './PopUp/transfer/transfer.component';
import { TransactionComponent } from './PopUp/transaction/transaction.component';
import { AdminproductvalidComponent } from './PopUp/adminproductvalid/adminproductvalid.component';
import { HeaderuserprofiledropdownComponent } from './headeruserprofiledropdown/headeruserprofiledropdown.component';
import { AddnewuserComponent } from './PopUp/addnewuser/addnewuser.component';
import { SeelistdialogComponent } from './PopUp/seelistdialog/seelistdialog.component';
import { BuysellchartComponent } from './Charts/buysellchart/buysellchart.component';
import { DeletelistdialogComponent } from './PopUp/deletelistdialog/deletelistdialog.component';
import { TiposdemenuComponent } from './Menu/tiposdemenu/tiposdemenu.component';
import { TitleComponent } from './title/title.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    TitleComponent,
		TiposdemenuComponent,
		BuysellchartComponent,
		SeelistdialogComponent,
		AddnewuserComponent,
		HeaderuserprofiledropdownComponent,
		AdminproductvalidComponent,
		DeletelocationuserComponent,
		ShowcartdataComponent
  ],
  imports: [
    CommonModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		// ChartsModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		PerfectScrollbarModule,
		TranslateModule,
		MatCheckboxModule,
		MatMenuModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatTableModule,  
		FlexLayoutModule,
		RouterModule,
		MatListModule,
		MatGridListModule,
		//MaterialFileInputModule,
		SweetAlert2Module.forRoot()
  ],
  exports : [
		TitleComponent,
		TiposdemenuComponent,
		BuysellchartComponent,
		HeaderuserprofiledropdownComponent,
		MatFormFieldModule
	],
	entryComponents: [
      DeletelistdialogComponent,
      SeelistdialogComponent,
	  AddnewuserComponent,
	  AdminproductvalidComponent,
	  TransactionComponent,
	  TransferComponent,
	  TransactionresponseComponent,
	  InvoicedetailComponent,
	  TransactiondetailComponent,
	  StoredetailviewComponent,
	  DeletelocationuserComponent,
	  LocationpredeterminedComponent,
	  ShowcartdataComponent,
	  FailerrortransactiongatewayComponent,
	  FailtransactiongatewayComponent,
	  InvoicedetailusrComponent
   ]
})
export class WidgetModule { }
