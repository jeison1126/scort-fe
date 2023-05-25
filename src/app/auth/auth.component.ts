import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../Services/api.service';


interface TokenObj {
  token: string;
  user_id: string;
  type_user: string;
  non_field_errors: string;
  id_store: string;
  personal_name: string;
  user_email: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit  {


  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
});

registerMode = false;
public show: boolean = false;

/* toastfaildeleteproduct: ToastOptions = {
    title: "Fallo eliminacion",
    msg: "Fallo eliminación del producto o servicio contacte con el administrador!",
    showClose: true,
    timeout: 8000,
    theme: "material"
}; */

constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    public formBuilder: FormBuilder,
    //private toastyService: ToastaService,
) { }

ngOnInit() {

    this.addBodyClass();
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
        this.router.navigate(['/admin-panel']);
    }

    this.authForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],

    });
}


addBodyClass() {

    window.addEventListener('load',function(){
       document.querySelector('body')!.classList.add("loaded")  
     });

  }

saveForm() {
    if (this.authForm.valid) {
        if (!this.registerMode) {
            this.loginUser();                                                
        } else {
            this.apiService.registerUser(this.authForm.value).subscribe(
                result => {
                    // console.log(result["status"]);
                    this.loginUser();
                },
                // error => console.log(error)
            );
        }
    } else {
        for (let i in this.authForm.controls) {
            //this.authForm.controls[i].markAsTouched(); Jeison
        }
    }

}

loginUser() {
    this.show = false;
    this.apiService.loginUser(this.authForm.value).subscribe(
        (result: any) => {
            this.show = false;
            localStorage.setItem('mr-token', result.token);
            localStorage.setItem('id-store', result.id_store);
            localStorage.setItem('id-user', result.user_id);
            localStorage.setItem('personal_name', result.personal_name);
            localStorage.setItem('user_email', result.user_email);
            if(result.type_user == '2'){
                localStorage.setItem('mr-token-front', result.token);
                localStorage.setItem('id_type_user', result.type_user);
                localStorage.setItem('id_user_front', result.user_id);
                localStorage.setItem('personal_name', result.personal_name);                  
                localStorage.setItem('user_email', result.user_email);
            }                   

            this.router.navigate(['/admin-panel']);
        },
        error => {
            
            this.show = true;
            console.log(error)
        }
    );
}
}
