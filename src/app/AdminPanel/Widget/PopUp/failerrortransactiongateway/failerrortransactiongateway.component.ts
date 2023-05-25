import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-failerrortransactiongateway',
  templateUrl: './failerrortransactiongateway.component.html',
  styleUrls: ['./failerrortransactiongateway.component.css']
})
export class FailerrortransactiongatewayComponent implements OnInit  {

  data!: string;

   constructor(
      public dialogRef: MatDialogRef<FailerrortransactiongatewayComponent>,
      private apiService: ApiService,
      private router: Router
   ) {
   }

   ngOnInit() {
   }

   yes(id_location:number) {
      this.dialogRef.close("yes");
      const id_user_front = localStorage.getItem('id_user_front');
      let myObj_user_client = { "predetermined": "True", "id_user_front": id_user_front };
      const body = JSON.stringify(myObj_user_client);
      this.apiService.deleteLocationAction(id_location).subscribe(
         result => {
            console.log(result);
            window.location.reload();
            
            // this.router.navigate(['/account/address']).then(() => {
            //    window.location.reload();
            // });
         },
         error => {
            console.log(error)
         }
      );
   }

}
