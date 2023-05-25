import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { EmbryoService } from 'src/app/Services/embryo.service';
import { AdminPanelServiceService } from '../Service/AdminPanelService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

    deviceInfo: any = null;
    public _mediaSubscription!: Subscription;
    public _routerEventsSubscription!: Subscription;
    private _router!: Subscription;
    isMobile: boolean = false;
    isMobileStatus!: boolean;
    layout: any = "ltr";
    rtlStatus: boolean = false;

    /** Used for toggle the sidebar menu. **/
    @ViewChild('sidenav', { static: true }) sidenav:any;

    constructor(
        public coreService: AdminPanelServiceService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private deviceService: DeviceDetectorService,
        private media: MediaObserver,
        private cookieService: CookieService,
        public embryoService: EmbryoService ) { }

    ngOnInit() {
        // const mrToken = this.cookieService.get('mr-token');
        this.addBodyClass();
        const mrToken = localStorage.getItem('mr-token');
        if (!mrToken) {
            this.router.navigate(['/auth']);
        } else {
            // document.getElementById('html').classList.remove("user-end");

            this.deviceInfo = this.deviceService.getDeviceInfo();
            if (this.deviceInfo.device == 'ipad' || this.deviceInfo.device == 'iphone' || this.deviceInfo.device == 'android') {
                this.coreService.sidenavMode = 'over';
                this.coreService.sidenavOpen = false;
            }

            /* this._mediaSubscription = this.media.media$.subscribe((change: MediaChange) => {

                this.isMobileStatus = (change.mqAlias == 'xs') || (change.mqAlias == 'sm') || (change.mqAlias == 'md');
                this.isMobile = this.isMobileStatus;
                if (this.isMobile) {
                    this.coreService.sidenavMode = 'over';
                    this.coreService.sidenavOpen = false;
                }
                else {
                    this.coreService.sidenavMode = 'side';
                    this.coreService.sidenavOpen = true;
                }
            });  */

            this._routerEventsSubscription = this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd && this.isMobile) {
                    this.sidenav.close();
                }
            }); 

            if ((this.activatedRoute.snapshot.url[0].path) == 'admin-panel') {
                // document.getElementById('html').classList.add('admin-panel');
            } else {
                // document.getElementById('html').classList.remove("user-end");
            }

        }

    }


    addBodyClass() {
 
        window.addEventListener('load',function(){
           const body = document.querySelector('body')
           if(body){
            body.classList.add("loaded")  
           }
         });
         
   
         var className = "inverted";
         var scrollTrigger = 60;
         
         window.onscroll = function() {
   
           if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
            //  document.getElementsByClassName("fixedheader")[0].classList.add(className);
            //  document.getElementsByClassName("back-to-top")[0].classList.add("visible");
           } else {
            //  document.getElementsByClassName("fixedheader")[0].classList.remove(className);
            //  document.getElementsByClassName("back-to-top")[0].classList.remove("visible");
           }
         };
  
  
      }

    logout(){
        console.log("saliendoo.....");
        this.cookieService.delete('mr-token');
        this.router.navigate(['/auth']);
    }


    /**
      * changeRTL method is used to change the layout of template rtl.
      */
    changeRTL() {
        this.layout = "rtl"
        this.rtlStatus = true;
    }

    /**
      * changeLTR method is used to change the layout of template ltr.
      */
    changeLTR() {
        this.layout = "ltr"
        this.rtlStatus = false;
    }

    /**
      *As router outlet will emit an activate event any time a new component is being instantiated.
      */
    onActivate(e:any) {
        window.scroll(0, 0);
    }

}
