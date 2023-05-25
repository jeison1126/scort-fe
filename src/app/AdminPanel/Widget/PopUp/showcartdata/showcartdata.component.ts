import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';
import { Product } from '../addcart/addcart.component';

@Component({
  selector: 'app-showcartdata',
  templateUrl: './showcartdata.component.html',
  styleUrls: ['./showcartdata.component.css']
})
export class ShowcartdataComponent implements OnInit{

   data: any;
   total!: string;
   // image: string;
   gallery!: string;
   adminprList: any[] = [];
   adminProductList: any[] = [];
   @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
   dataSource = new MatTableDataSource<any>(this.adminProductList);
   
   constructor(
      public embryoService : EmbryoService, 
      public dialogRef: MatDialogRef<ShowcartdataComponent>,
      private apiService: ApiService,
      private router: Router,
      private toastyService: ToastrService,
   ) { }
   
   ngOnInit() {
   }
   
   onClose() {
      this.dialogRef.close("yes");      
   }


}
