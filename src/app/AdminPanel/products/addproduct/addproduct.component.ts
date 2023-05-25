import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { delay, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
declare let alertify: any;

export interface Category {
   id: string;
   name_category: string;
}
export interface Subcategory {
   id: number;
   name_subcategory: string;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit  {

  widthMin: Number = 700;
   heightMin: Number = 700;
   isApproved: boolean = false;
   selectedFiles!: FileList;
   files: File[] = [];
   subcategories: Subcategory[] = [];
   subcategorieslist: Subcategory[] = [];

   public subcategoryFilterCtrl: FormControl = new FormControl();
   next_id_image: any;
   doc_identi_docu: any;
   form!: FormGroup;
   mainImgPath!: string;
   colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
   sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
   quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   public imagePath: any;
   prod_category$!: Observable<Category[]>;
   sub_catego$!: Observable<Subcategory[]>;
   selectedProdCate: any;
   selectedSubcategory: any;
   selectedAvaila: any;

   "data": any = [
      {
         "image": "https://via.placeholder.com/625x800",
         "image_gallery": [
            "https://via.placeholder.com/625x800",
            "https://via.placeholder.com/625x800",
            "https://via.placeholder.com/625x800",
            "https://via.placeholder.com/625x800",
            "https://via.placeholder.com/625x800"
         ]
      }
   ]

   productForm!: FormGroup;
   public availa: FormControl = new FormControl(null, [Validators.required]);

   // START ANGULAR MAT SEARCH CATEGORIES    
   /** control for the selected bank */
   public categoryCtrl: FormControl = new FormControl(null, [Validators.required]);
   public subcategoryCtrl: FormControl = new FormControl(null, [Validators.required]);
   public categoryFilterCtrl: FormControl = new FormControl();
   // END ANGULAR MAT SEARCH CATEGORIES

   categorylist: Category[] = [];
   category: Category[] = [];

  /*  toastvalidateimg: ToastOptions = {
      title: "Imagen",
      msg: "Ingresar por lo menos una imagen!",
      showClose: true,
      timeout: 8000,
      theme: "material"
   };

   toastsaveproduct: ToastOptions = {
      title: "Producto registrado",
      msg: "El producto o servicio a sido registrado!",
      showClose: true,
      timeout: 8000,
      theme: "material"
   }; */
/* 
   toastRejectPixelsImg: ToastOptions = {
      title: "Dimension de imagen",
      msg: "No pudimos subir algunas de tus imágenes\n Deben tener formato jpg o png\n Deben tener más de 700 píxeles en uno de sus lados.",
      showClose: true,
      timeout: 8000,
      theme: "material"
   };
 */
   public show: boolean = false;

   constructor(
      public formBuilder: FormBuilder,
      private apiService: ApiService,
      private cookieService: CookieService,
      private toastyService: ToastrService,
      private router: Router,
   ) { }

   btnDisabled = false;

   ngOnInit() {

      this.productForm = this.formBuilder.group({
         name_product: ['', [Validators.required]],
         description_product: ['', [Validators.required]],
         product_code: ['', [Validators.required]],
         stock: ['', [Validators.required]],
         categoryCtrl: new FormControl('', [Validators.required]),
         subcategoryCtrl: new FormControl('', [Validators.required]),
         brand: ['', [Validators.required]],
         discount_price: ['', [Validators.required]],
         total_price: ['', [Validators.required]],
         availa: new FormControl('', [Validators.required]),
      });

      // START ANGULAR MAT SEARCH CATEGORIES
      this.category = [];
      this.apiService.getCategories().subscribe(
         (data: Category[]) => {
            this.categorylist = data;
            for (var i in this.categorylist) {
               let get_id_category = this.categorylist[i]['id'];
               let get_category = this.categorylist[i]['name_category'];
               this.category.push({ name_category: get_category, id: get_id_category });
            }

            this.prod_category$ = this.getCategoriesProd("", this.category);

         },
         (error:any) => console.log(error)
      );
      // END ANGULAR MAT SEARCH CATEGORIES   

      this.mainImgPath = this.data[0].image;
      this.form = this.formBuilder.group({
         name: [],
         price: [],
         availablity: [],
         product_code: [],
         description: [],
         tags: [],
         features: []
      });
   }



   onSelect(event:any) {
      console.log(event);
      this.files.push(...event.addedFiles);
   }

   onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
   }


   //START SET EVENT FROM DROPZONE COMPLEMENT
   selectFile(event:any) {
      // console.log("entrando a evento");
      // console.log(event.addedFiles.length);
      // console.log(this.files.length);
      let index = this.files.length != event.addedFiles ? 0 : this.files.length;
      event.addedFiles.map((item:any) => {
         this.onValidatePixels(item)
            .then((value: any) => {
               if (value) {
                  this.files.push(item);
               } else {
                  // event.addedFiles.splice(this.files.length, 1);
                  //this.toastyService.error(this.toastRejectPixelsImg);
               }

            });
      });

   }

   onValidatePixels(file: File) {
      return new Promise((resolve, reject) => {
         const Img = new Image();
         Img.src = URL.createObjectURL(file);
         Img.onload = (e: any) => {
            console.log(e);
            const height = e.path[0].height;
            const width = e.path[0].width;
            if (height >= this.heightMin || width >= this.widthMin) {
               resolve(true);
            }
            resolve(false);
         };
      });

   }
   //END SET EVENT FROM DROPZONE COMPLEMENT


   
   subcategoriesChangeAction(categori_id:any) {
      // START ANGULAR MAT SEARCH SUBCATEGORIES
      let id_category = categori_id.id;
      this.subcategories = [];
      this.apiService.getSubCategories(id_category).subscribe(
         (data: Subcategory[]) => {
            this.subcategorieslist = data;
            for (var i in this.subcategorieslist) {
               let get_id_subcategory = this.subcategorieslist[i]['id'];
               let get_name_subcategory = this.subcategorieslist[i]['name_subcategory'];
               this.subcategories.push({ id: get_id_subcategory, name_subcategory: get_name_subcategory });
            }
            this.sub_catego$ = this.getSubcategories("", this.subcategories);
         },
         (error:any) => console.log(error)
      );
      // END ANGULAR MAT SEARCH SUBCATEGORIES

   }



   onChangeDocIde(event: any) {
      console.log(event);

      if (event.target.files.length > 0) {
         this.doc_identi_docu = event.target.files[0];
      }
   }

   getCategoriesProd(term: string, algo:any): Observable<Category[]> {
      let items = algo;
      if (term) {
         items = items.filter((x:any) => x.name_category.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
      }
      return of(items).pipe(delay(500));
   }

   getSubcategories(term: string, algo:any): Observable<Subcategory[]> {
      let items = algo;
      if (term) {
         items = items.filter((x:any) => x.name_subcategory.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
      }
      return of(items).pipe(delay(500));
   }


   submitProductInfo() {      

      if (this.files.length > 0) {
         if (this.productForm.valid) {
            this.btnDisabled = true;
            this.show = !this.show;
            let myObj_product;
            let values_productForm = this.productForm.value;            

            const id_store = localStorage.getItem('id-store');
            myObj_product = {
               "name_product": values_productForm.name_product,
               "description_product": values_productForm.description_product,
               "product_code": values_productForm.product_code,
               "total_price": values_productForm.total_price,
               "availability": this.selectedAvaila,
               "stock": values_productForm.stock,
               "store": id_store,
               "brand": values_productForm.brand,
               "subcategory_id": this.selectedSubcategory,
               "discount_price": values_productForm.discount_price,
               "features": 'na',
               "state": 1,
               "image": '1',
               "published": 'false'
            };

            // START CREATE REGITER PRODUCT ON THE DB 
            this.apiService.setProduct(myObj_product).subscribe(
               result => {
                  let myJSON = JSON.stringify(result);
                  let obj = JSON.parse(myJSON);
                  let id_product = obj.id_product;
                  let get_first_image_name = '';

                  // START UPLOAD IMAGES ON S3 AWS ASOCIATE TO THE PRODUCT
                  let consec = 0;
                  var today = new Date();
                  for (var i = 0; i < this.files.length; i++) {

                     const file = this.files[i];
                     let type = file.type;
                     let type_sp = type.split("/");
                     let get_type_img = type_sp[1];
                     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     var dateTime = date + ' ' + time;
                     var dates_as_int = [dateTime];
                     const dates = dates_as_int.map(date => new Date(date).getTime());
                     const namefile = id_store + '-' + this.selectedSubcategory.id + '-' + dates + i + '.' + get_type_img;

                     if (i == 0) {
                        get_first_image_name = namefile;
                     }

                     const formDataDocIde = new FormData();
                     formDataDocIde.append('image', file);
                     formDataDocIde.append('product', id_product);
                     formDataDocIde.append('image_name', namefile);

                     this.apiService.uploadFile(formDataDocIde).subscribe(
                        result => {
                           consec = consec + 1;
                           if ((consec == this.files.length) && (result)) {
                              this.apiService.updateImageProduc(get_first_image_name, id_product).subscribe(
                                 result => {
                                    this.router.navigate(['/admin-panel/products']).then(() => {
                                       // this.toastyService.success(this.toastsaveproduct);
                                    });
                                 },
                                 error => console.log(error)
                              );

                           }
                        },
                        error => console.log(error)
                     );
                  }
                  // END UPLOAD IMAGES ON S3 AWS ASOCIATE TO THE PRODUCT
               },
               error => console.log(error)
            );
            // END CREATE REGISTER PRODUCT ON THE DB 
         } else {
            for (let i in this.productForm.controls) {
               this.productForm.controls[i].markAsTouched();
            }
         }

      } else {
         //this.toastyService.error(this.toastvalidateimg);
      }
      return false;
   }


   /**
    * getImagePath is used to change the image path on click event. 
    */
   public getImagePath(imgPath: string, index: number) {
      document.querySelector('.border-active')!.classList.remove('border-active');
      this.mainImgPath = imgPath;
      document.getElementById(index + '_img')!.className += " border-active";
   }

}
