import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { numbers } from '@material/dialog';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-locationpredetermined',
  templateUrl: './locationpredetermined.component.html',
  styleUrls: ['./locationpredetermined.component.css']
})
export class LocationpredeterminedComponent {

   data?: any;
   gallery!: string;
   adminprList: any[] = [];
   adminProductList: any[] = [];
   @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
   dataSource = new MatTableDataSource<any>(this.adminProductList);
   /* toastOption: ToastOptions = {
      title: "Predeterminada",
      msg: "La ubicación ha quedado predeterminada!",
      showClose: true,
      timeout: 3000,
      theme: "material"
  }; */

  constructor(
    public dialogRef: MatDialogRef<LocationpredeterminedComponent>,
    private apiService: ApiService,
    private router: Router,
    //private toastyService: ToastaService,
 ) { }

 ngOnInit() {
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

deleteLocation(id:number) {
  //Open the dialog
  this.apiService.deleteLocationUserDialog(id);
}

predetermined(id:number) {
  const id_user_front = localStorage.getItem('id_user_front');
  let myObj_user_client = { "predetermined": "True", "id_user_front": id_user_front };
  const body = JSON.stringify(myObj_user_client);
  this.apiService.updateLocationPredetermined(body, id).subscribe(
     result => {
        this.router.navigate(['/checkout/payment']).then(() => {
           window.location.reload();
           //this.toastyService.success(this.toastOption);
        });
     },
     error => {
        console.log(error)
     }
  );
}

editLocation(id:number){
  this.router.navigate(['/account/address/edit/'+id]).then(() => {
     // window.location.reload();
  });
}
}
