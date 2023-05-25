import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { numbers } from '@material/dialog';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';

export interface Location {
  id: number;
  nameci: string;
  departament: string;
  number: string;
  neighborhood: string;
  via: string;
  sn: string;
  additional_data: string;
  phone: string;
  contact: string;
  predetermined: boolean;
}

@Component({
  selector: 'app-ubicationdetailsidebar',
  templateUrl: './ubicationdetailsidebar.component.html',
  styleUrls: ['./ubicationdetailsidebar.component.css']
})
export class UbicationdetailsidebarComponent implements OnInit  {

  cartProducts: any;
   popupResponse: any;
   locationsGrid: Location[] = [];
   alllocationsGrid: any;
   get_location: Location[] = [];
   get_locations: Location[] = [];

   constructor(
      private router: Router,
      public embryoService: EmbryoService,
      private apiService: ApiService,
      private loadingBar: LoadingBarService) { }

   ngOnInit() {
      let id_user_front = localStorage.getItem("id_user_front");
      this.get_locations = [];
      this.apiService.FilterLocationsByIdUser(id_user_front!).subscribe({
        next:(response:any) => {
          for (var i = 0; i < response.length; i++) {
            let id = response[i].id;
            let nameci = response[i].nameci;
            let departament = response[i].departament;
            let number = response[i].number;
            let neighborhood = response[i].neighborhood;
            let via = response[i].via;
            let sn = response[i].sn;
            let additional_data = response[i].additional_data;
            let phone = response[i].phone;
            let contact = response[i].contact;
            let predetermined = response[i].predetermined;
            this.get_locations.push({
               id: id,
               nameci: nameci,
               departament: departament,
               number: number,
               neighborhood: neighborhood,
               via: via,
               sn: sn,
               additional_data: additional_data,
               phone: phone,
               contact: contact,
               predetermined: predetermined
            });
         }
         this.alllocationsGrid = this.get_locations;    
        },
        error:(error:any)=>{
          console.log(error);
        }
      })
   }



   editLocation(id:number) {
      this.router.navigate(['/account/address/edit/' + id]).then(() => {
         window.location.reload();
      });
   }

   predetermined(id:number) {
      const id_user_front = localStorage.getItem('id_user_front');
      let myObj_user_client = { "predetermined": "True", "id_user_front": id_user_front };
      const body = JSON.stringify(myObj_user_client);
      this.apiService.updateLocationPredetermined(body, id).subscribe(
         result => {
            this.router.navigate(['/checkout/payment']).then(() => {
               window.location.reload();
               // this.toastyService.success(this.toastOption);
            });
         },
         error => {
            console.log(error)
         }
      );
   }

   deleteLocation(id:number) {
      //Open the dialog
      this.apiService.deleteLocationUserDialog(id);
   }

   close() {      
      this.embryoService.ubicationSidenavOpen = !this.embryoService.ubicationSidenavOpen;
   }


}
