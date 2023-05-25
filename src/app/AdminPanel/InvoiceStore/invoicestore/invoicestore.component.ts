import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { numbers } from '@material/dialog';
import { Invoice } from 'src/app/Models/Invoice';
import { ApiService } from 'src/app/Services/api.service';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

@Component({
  selector: 'app-invoicestore',
  templateUrl: './invoicestore.component.html',
  styleUrls: ['./invoicestore.component.scss']
})
export class InvoicestoreComponent implements OnInit  {

  popUpDeleteUserResponse: any;
   invoiceList: any[] = [];
   invDetailGrid!: Invoice;

   @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

   dataSource = new MatTableDataSource<any>(this.invoiceList);

   displayedColumns: string[] = ['reference_invoice', 'created_at', 'name_store', 'name_state', 'type_identifier', 'number_identifier', 'paymentmethod', 'reference', 'total_price', 'action'];

   constructor(
      public service: AdminPanelServiceService,
      private apiService: ApiService,
   ) { }

   ngOnInit() {      
      const id_store = Number(localStorage.getItem('id-store'));
      this.apiService.ListInvoicesByStore(id_store).subscribe((res:any) => this.getAllInvoiceData(res));
   }


   getAllInvoiceData(response:any) {
      this.invoiceList = response;
      this.dataSource = new MatTableDataSource<any>(this.invoiceList);
      setTimeout(() => {
         this.dataSource.paginator = this.paginator;
      }, 0)
   }



   onSeeDialog(data:any) {
      console.log(data.id);      
      this.apiService.getInvoiceDetail(data.id).subscribe((dataDetailInvoice:any) => this.getInvoiceDetailData(dataDetailInvoice, data));
   }


   getInvoiceDetailData(dataDetailInvoice:any, dataInvoice:any) {      
      let myObj_invoice;
      myObj_invoice = {
         adress: dataInvoice.adress,
         created_at: dataInvoice.created_at,
         departament: dataInvoice.departament,
         email: dataInvoice.email, 
         first_name_client: dataInvoice.first_name_client,
         id_store_id: dataInvoice.id_store_id,
         id: dataInvoice.id,
         name_client: dataInvoice.name_client,
         name_state: dataInvoice.name_state,
         name_store: dataInvoice.name_store,
         nameci: dataInvoice.nameci,
         number_identifier: dataInvoice.number_identifier,
         paymentmethod: dataInvoice.paymentmethod,
         phone: dataInvoice.phone,
         reference: dataInvoice.reference,
         reference_invoice: dataInvoice.reference_invoice,
         state_id: dataInvoice.state_id,
         total_price: dataInvoice.total_price,
         transaction_id: dataInvoice.transaction_id,
         type_identifier: dataInvoice.type_identifier,
         user_id: dataInvoice.user_id,
         invoice_detail : dataDetailInvoice
      };
 
      this.invDetailGrid = myObj_invoice;
      this.apiService.PopUpInvoiceDetail(this.invDetailGrid);
   }

   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

}
