import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-deletelocationuser',
  templateUrl: './deletelocationuser.component.html',
  styleUrls: ['./deletelocationuser.component.css']
})
export class DeletelocationuserComponent  implements OnInit {

  data!: string;

   constructor(
      public dialogRef: MatDialogRef<DeletelocationuserComponent>,
      private apiService: ApiService,
      private router: Router,
   ) {
   }

   ngOnInit() {
   }

   yes(id_location:any) {
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
