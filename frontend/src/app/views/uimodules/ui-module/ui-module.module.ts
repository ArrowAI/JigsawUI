import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModuleComponent } from './ui-module.component';
import {Routes ,RouterModule} from "@angular/router"
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
const routes:Routes=[
{
  path: '',
  component: UiModuleComponent,
}
]
@NgModule({
  declarations: [
    UiModuleComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ]
})
export class UiModuleModule { }
