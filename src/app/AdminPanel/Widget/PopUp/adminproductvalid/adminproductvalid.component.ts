import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/Models/Products';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-adminproductvalid',
  templateUrl: './adminproductvalid.component.html',
  styleUrls: ['./adminproductvalid.component.css']
})
export class AdminproductvalidComponent implements OnInit {

  data! : Products;
  gallery! : string;
  adminprList: any[] = [];
  adminProductList: any[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>(this.adminProductList);

  constructor(
     public dialogRef : MatDialogRef<AdminproductvalidComponent>,
     private apiService: ApiService,
     private router: Router,
     private toastyService: ToastrService,
     ){} 

  ngOnInit() {
  }

  product_aprobed(data:any){
     let state = 2;
     this.apiService.updateStateProduct(state,data.id).subscribe(
        (res) => {
           let JsonDataEmail = {
              "email": data.email
          }
          this.apiService.sendAdAprove(JsonDataEmail).subscribe();
           this.onClose(res)
        },
    );
  }

  product_reject(data:any){
     let state = 3;
     this.apiService.updateStateProduct(state,data.id).
     subscribe(
        (res) => {
           let JsonDataEmail = {
              "email": data.email
          }
           this.apiService.sendAdReject(JsonDataEmail).subscribe();
           this.onClose(res)
        },
    );
  }

  onClose(response:any){
     if(response.result==200){
        this.dialogRef.close("yes"); 

        this.router.navigate(['/admin-panel/admin_products']).then(() => {
           window.location.reload();
           // this.toastyService.success(this.toastsaveproduct);
        });
        
     }else{
        console.log("fail");
     }
  }

}
