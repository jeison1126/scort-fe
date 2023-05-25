import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StoreAdmin, StoreDocs } from 'src/app/Models/StoreAdmin';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-storedetailview',
  templateUrl: './storedetailview.component.html',
  styleUrls: ['./storedetailview.component.css']
})
export class StoredetailviewComponent implements OnInit {

   data! : StoreAdmin;
   docs_data! : StoreDocs;
   gallery : string | undefined;
   adminprList: any[] = [];
   adminProductList: any[] = [];
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;

   dataSource = new MatTableDataSource<any>(this.adminProductList);

   constructor(
      public dialogRef : MatDialogRef<StoredetailviewComponent>,
      private apiService: ApiService,
      private router: Router
      ){} 

   ngOnInit() {
   }

   product_aprobed(id_prod:number){
      let state = 2;
      this.apiService.updateStateProduct(state,id_prod).subscribe(res => this.onClose(res));  
   }

   product_reject(id_prod:number){
      let state = 3;   
      this.apiService.updateStateProduct(state,id_prod).subscribe(res => this.onClose(res));  
   }

   onClose(response:any){
      if(response.result==200){
         this.dialogRef.close("yes"); 

         this.router.navigate(['/admin-panel/admin_products']).then(() => {
            window.location.reload();
         });
         
      }else{
         console.log("fail");
      }
   }

}
