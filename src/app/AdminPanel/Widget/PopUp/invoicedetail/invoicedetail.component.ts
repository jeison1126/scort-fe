import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/Models/Invoice';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoicedetail',
  templateUrl: './invoicedetail.component.html',
  styleUrls: ['./invoicedetail.component.css']
})
export class InvoicedetailComponent implements OnInit  {

  data!: Invoice;
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
     public dialogRef: MatDialogRef<InvoicedetailComponent>,
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

  product_aprobed(id_prod:number) {
     let state = 2;
     this.apiService.updateStateProduct(state, id_prod).subscribe(res => this.onClose(res));
  }

  product_reject(id_prod:number) {
     let state = 3;
     this.apiService.updateStateProduct(state, id_prod).subscribe(res => this.onClose(res));
  }

  onClose(response:any) {
     if (response.result == 200) {
        this.dialogRef.close("yes");

        this.router.navigate(['/admin-panel/admin_products']).then(() => {
           window.location.reload();
           // this.toastyService.success(this.toastsaveproduct);
        });

     } else {
        console.log("fail");
     }
  }


  /**
   * Function to change order status, new status is sent 
   * @param  {Number} num1 The first number
   * @param  {Number} num2 The second number
   * @return {Number}      The total of the two numbers
  */
  ChangeStatusSend(data:any) {
     let myObj_store = {
        "state": "4"
     };
     this.apiService.UpdateStatusInvoice(myObj_store, data.id).subscribe(
        result => {
           window.location.reload();
        },
        error => console.log(error)
     );
  }

  onChangeCamCom(event: any) {
     if (event.target.files.length > 0) {
        this.cam_com = event.target.files[0];
     }
  }

  /**   
 * Change invoice's status 
 * @param none
 * @returns update status
 */

  ShippingVoucherRequest() {

     if (this.ShippmentForm.valid) {
     this.show = !this.show;
     let myObj_store = {
        "state": "5",
        "external_state": "1",
     };
     this.apiService.UpdateStatusInvoice(myObj_store, this.id_invoice).subscribe(
        result => {
           // window.location.reload();
           const formDataShippmentVoucher = new FormData();
           formDataShippmentVoucher.append('shipping_voucher', this.cam_com);
           formDataShippmentVoucher.append('id_invoice', this.id_invoice);
           this.apiService.UpdateShippingVoucherInvoice(formDataShippmentVoucher).subscribe(
              result => {
                 window.location.reload();
              },
              error => console.log(error)
           );
        },
        error => console.log(error)
     );
     } else {
        console.log("fails");
        for (let i in this.ShippmentForm.controls) {
           this.ShippmentForm.controls[i].markAsTouched();
        }
     }
  }

}
