import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/Models/Menus';
import { ApiService } from 'src/app/Services/api.service';
import { MenuItems } from '../../Core/menu/MenuItems/MenuItems';


@Component({
  selector: 'app-menulistitems',
  templateUrl: './menulistitems.component.html',
  styleUrls: ['./menulistitems.component.scss']
})
export class MenulistitemsComponent implements OnInit {

  menulist: Menu[] = [];
	get_menu: Menu[] = [];
	constructor(public menuItems: MenuItems,
		private apiService: ApiService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		//public translate: TranslateService
    ) { }

	ngOnInit() {		
		this.get_menu = [];
		this.apiService.getMenus().subscribe(
			(data:any) => {
				this.menulist = data;
				for (var i in this.menulist) {
					let get_state = this.menulist[i]['state'];
					let get_name = this.menulist[i]['name'];
					let get_type = "link";
					let get_icon = this.menulist[i]['icon'];
					this.get_menu.push({state:get_state,name:get_name,type:get_type,icon:get_icon});
				}
			},
			error => console.log(error)
		);
		
	}

}
