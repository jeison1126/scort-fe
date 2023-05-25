import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Services/api.service';

export interface Product {
  name: string;
  image: string;
  price: string;
  produc_code: string;
}

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})

export class AddcartComponent implements OnInit {

  data!: Product;
  // image: string;
  gallery: string | undefined;
  adminprList: any[] = [];
  adminProductList: any[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;
  dataSource = new MatTableDataSource<any>(this.adminProductList);
  /* toastOption: ToastOptions = {
     title: "Predeterminada",
     msg: "La ubicación ha quedado predeterminada!",
     showClose: true,
     timeout: 3000,
     theme: "material"
 }; */

  constructor(
     public dialogRef: MatDialogRef<AddcartComponent>,
     private apiService: ApiService,
     private router: Router,
     private toastyService: ToastrService,
  ) { }
  
  ngOnInit() {
  }
  
  onClose() {
     this.dialogRef.close("yes");
     this.router.navigate(['/cart'])
  }

}
