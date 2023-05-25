import { Component, OnInit } from '@angular/core';
import { EmbryoService } from 'src/app/Services/embryo.service';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private coreService : AdminPanelServiceService,
    public embryoService: EmbryoService) { }

ngOnInit() {
}

/**
* toggleSidebar method is used a toggle a side nav bar.
*/
toggleSidebar() {
this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
}

public selectedLanguage(value:any) {
this.embryoService.language = value;
}

}
