import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FiltersComponent } from '../../pages/user-management/users/filters/filters.component';
import { BooleanInputComponent } from './fiterInput/boolean/input/input.component';


import { StringInputComponent } from './fiterInput/string/input/input.component';
import { StringDropdownComponent } from './fiterInput/string/dropdown/dropdown.component';

import { DoubleInputComponent } from './fiterInput/double/input/input.component';
import { DoubleDropdownComponent } from './fiterInput/double/dropdown/dropdown.component';
import { BooleanDropdownComponent } from './fiterInput/boolean/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { MessagingService } from './service/messaging.service';
// import { MessagingService } from 'src/app/service/messaging.service';



@NgModule({
  declarations: [
    BooleanInputComponent,
    BooleanDropdownComponent,
    StringDropdownComponent,
    StringInputComponent,
    DoubleDropdownComponent,
    DoubleInputComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  
  exports: [BooleanInputComponent,
    BooleanDropdownComponent,
    StringDropdownComponent,
    StringInputComponent,
    DoubleDropdownComponent,
    DoubleInputComponent],
    providers:[MessagingService]
    // providers:[MessagingService]
 // exports[BooleanInputComponent,BooleanDropdownComponent]
})
export class FilterModule { 

}
