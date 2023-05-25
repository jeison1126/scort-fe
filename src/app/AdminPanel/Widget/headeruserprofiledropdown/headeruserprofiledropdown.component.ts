import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-headeruserprofiledropdown',
  templateUrl: './headeruserprofiledropdown.component.html',
  styleUrls: ['./headeruserprofiledropdown.component.css']
})
export class HeaderuserprofiledropdownComponent implements OnInit{


	constructor(public router : Router,
		private cookieService: CookieService,) { }

	ngOnInit() {
	}


	//log out method 
	logOut(){
		// console.log("saliendo1.......");
		// this.cookieService.delete('mr-token');	
		localStorage.clear();
        this.router.navigate(['/auth']);
		//document.getElementById('html').classList.remove("admin-panel");
		//this.router.navigate(['/session/signin']);
	}

}
