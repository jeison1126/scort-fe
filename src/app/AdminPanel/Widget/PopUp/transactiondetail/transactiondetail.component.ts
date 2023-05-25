import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/Models/Transactions';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-transactiondetail',
  templateUrl: './transactiondetail.component.html',
  styleUrls: ['./transactiondetail.component.css']
})
export class TransactiondetailComponent implements OnInit {

   data!: Transactions;
   gallery!: string;
   adminprList: any[] = [];
   adminProductList: any[] = [];
   total: any;
   img_product_rout: any;
   cam_com: any;
   ShippmentForm!: FormGroup;
   id_invoice: any;
   public show: boolean = false;

   @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

   dataSource = new MatTableDataSource<any>(this.adminProductList);
   displayedColumns: string[] = ['name_product'];

   constructor(
      public dialogRef: MatDialogRef<TransactiondetailComponent>,
      private apiService: ApiService,
      private router: Router,
      //private toastyService: ToastaService,
      private formGroup: FormBuilder,
   ) { }

   ngOnInit() {
   
   }

}
