import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footerone',
  templateUrl: './footerone.component.html',
  styleUrls: ['./footerone.component.css']
})
export class FooteroneComponent implements OnInit  {

  constructor(
    //  public menuItems : MenuItems,
    //public translate: TranslateService
  ) { }

   ngOnInit() {
    this.gotoTop();
    
   }

   gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
 

}
