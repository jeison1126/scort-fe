import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderoneComponent } from './headerone.component';
import { MatAutocomplete } from '@angular/material/autocomplete';



@NgModule({
  declarations: [HeaderoneComponent],
  imports: [
    CommonModule,
    MatAutocomplete
  ],
  exports: [
    RouterModule,
]
})
export class HeaderoneModule { }
