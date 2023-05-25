import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuToggleAnchorDirective, MenuToggleDirective, MenuToggleLinkDirective } from './MenuToggle';



@NgModule({
  declarations: [
    MenuToggleAnchorDirective,
    MenuToggleLinkDirective,
    MenuToggleDirective,
  ],
  exports: [
    MenuToggleAnchorDirective,
    MenuToggleLinkDirective,
    MenuToggleDirective,
   ],
})
export class MenuModule { }
