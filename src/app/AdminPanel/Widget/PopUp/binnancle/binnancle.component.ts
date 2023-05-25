import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { numbers } from '@material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-binnancle',
  templateUrl: './binnancle.component.html',
  styleUrls: ['./binnancle.component.css']
})
export class BinnancleComponent implements OnInit {

  // data: Invoice;
  data: any;
  gallery!: string;
  adminprList: any[] = [];
  adminProductList: any[] = [];
  total: any;
  img_product_rout: any;
  cam_com: any;
  ShippmentForm!: FormGroup;
  id_invoice: any;
  p:any;
  public show: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>(this.adminProductList);
  displayedColumns: string[] = ['name_product'];
  public observation = new FormControl('', Validators.required);
  public newForm = new FormGroup({
     observation: this.observation,
   });
  constructor(
     public dialogRef: MatDialogRef<BinnancleComponent>,
     private apiService: ApiService,
     private router: Router,
     //private toastyService: ToastaService,
     private formGroup: FormBuilder,
  ) { }

  ngOnInit() {

     let myJSONinvDetail = JSON.stringify(this.data);
     let obj = JSON.parse(myJSONinvDetail);
     this.id_invoice = obj.id;

     this.adminprList = obj.invoice_detail;
     
     this.img_product_rout = environment.api.baseBucketImageUrl;
     // this.total = obj.total_price

     this.ShippmentForm = this.formGroup.group({
        cam_com: new FormControl('', [Validators.required]),
     });

  }

  sendBinnacle(){  
               
     const id_store = localStorage.getItem('id-store');
     console.log(id_store);
     let type = ""
     if(parseInt(id_store!) > 0){
        type = "adm"         
     }else{
        type = "st"
     }
     
     var observation = (document.getElementById("message") as HTMLInputElement).value
     let user_id = localStorage.getItem('id-user');
     let id_invoice_popup = localStorage.getItem('id_invoice_popup');
     
     let myObjCreateBinnacle = {
        'observation': observation,
        'user_id': user_id,
        'id_invoice_popup': id_invoice_popup,
        'type': type
     };
     this.apiService.createBinnacle(myObjCreateBinnacle).subscribe();
     window.location.reload();
  }


}
