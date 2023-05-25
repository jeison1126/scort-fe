import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tiposdemenu',
  templateUrl: './tiposdemenu.component.html',
  styleUrls: ['./tiposdemenu.component.css']
})
export class TiposdemenuComponent implements OnInit {

  @Output() isCloseEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() isShowSpinner : EventEmitter<boolean> = new EventEmitter<boolean>();
	
	ngOnInit() {
		this.addBodyClass();
	}


	addBodyClass() {
 
        window.addEventListener('load',function(){
           document.querySelector('body')!.classList.add("loaded")  
         });
         
   
         var className = "inverted";
         var scrollTrigger = 60;
         
         window.onscroll = function() {
   
           if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
             document.getElementsByClassName("fixedheader")[0].classList.add(className);
             document.getElementsByClassName("back-to-top")[0].classList.add("visible");
           } else {
             document.getElementsByClassName("fixedheader")[0].classList.remove(className);
             document.getElementsByClassName("back-to-top")[0].classList.remove("visible");
           }
         };
  
  
      }

	constructor() { }

	/**
	  * Reload the component.
	  */
	showSpinner() {
	   this.isShowSpinner.emit(true);
 	}

 	/**
 	  * close the component.
 	  */
	onClose(){
		this.isCloseEvent.emit(true);
	}


}
