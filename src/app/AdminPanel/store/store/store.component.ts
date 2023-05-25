import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { StoreAdmin, StoreDocs } from 'src/app/Models/StoreAdmin';
import { ApiService } from 'src/app/Services/api.service';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

   popUpDeleteUserResponse: any;
   storeList: StoreAdmin[] = [];
   storeGrid!: StoreAdmin;
   storeDocsGrid: StoreDocs[] = [];

   @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

   dataSource = new MatTableDataSource<any>(this.storeList);

   displayedColumns: string[] = ['action','name_store', 'state_store', 'address', 'telephone', 'email', 'number_identifier', 'manager'];

   constructor(
      private apiService: ApiService,
      public service: AdminPanelServiceService,
      private sanitizer: DomSanitizer
   ) { }

   ngOnInit() {
      this.apiService.getStore().subscribe((res:any) => this.getStoreData(res));
   }

   getStoreData(response:any) {
      this.storeList = response;
      this.dataSource = new MatTableDataSource<any>(this.storeList);
      setTimeout(() => {
         this.dataSource.paginator = this.paginator;
      }, 0)
   }


   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   onSeeDialog(data:any) {
      this.apiService.getStoreData(data.id_store).subscribe(
         (res:any) => {
            this.apiService.getStoreDocuments(data.id_store).subscribe(
               (data_docs:any) => {
                  this.getStoreDialogData(res,data_docs);  
               }
            );
         }
      );
   }

   getStoreDialogData(response:any, data_docs:any) {
      let myObj_store;
      this.storeDocsGrid = [];

      let myObj_store_docs;
      myObj_store = {
         address: response.address,
         city: response.city,
         departament: response.departament,
         description: response.description,
         email: response.email,
         logo_store: response.logo_store_up,
         manager: response.manager,
         name_store: response.name_store,
         number_identifier: response.number_identifier,
         state_store: response.state_store,
         telephone: response.telephone,
      };   
      this.storeGrid = myObj_store;

      
      this.storeDocsGrid = data_docs.map((item:any) => {
         let url = item['url_document'];
         let extension: [] = url.split('.');
         
         let doc: StoreDocs = {
            id_documents: item['id_documents'],
            id_document_type: item['id_document_type'],
            type: item['type'],
            url_document: url,
            extension: extension[extension.length-1],
         };
         return doc;
      } );
      // console.log(this.storeDocsGrid);   
      // storeDocsGrid
      this.apiService.PopUpStoreViewValidate(this.storeGrid, this.storeDocsGrid);
   }

}
