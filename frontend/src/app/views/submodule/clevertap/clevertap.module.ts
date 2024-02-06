import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClevertapComponent } from './clevertap/clevertap.component';
import { ClevertapSnapshotComponent } from './clevertap-snapshot/clevertap-snapshot.component';
import { ClevertapTodayComponent } from './clevertap-today/clevertap-today.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const routes:Routes=[
 { path: '',
  component: ClevertapSnapshotComponent,
 children: [{
    path: '',
    redirectTo: 'today',
    pathMatch: 'full'
    },
    {
    path: 'today',
    component: ClevertapSnapshotComponent,
   }],
  }
]

@NgModule({
  declarations: [ClevertapComponent, ClevertapSnapshotComponent, ClevertapTodayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,        // <----- import for date formating(optional)
    MatMomentDateModule,
    NgbDropdownModule,
   
  ],
  providers:[
    DatePipe
  ]
})
export class ClevertapModule { }
