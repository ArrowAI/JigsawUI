// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from '@angular/fire';
// import { NgModule } from '@angular/core';

// import { environment } from '../../../../environments/environment';

// // import * as environment from '../../../../assets/app-config.json';


// @NgModule({
//   imports: [AngularFireModule.initializeApp(environment.firebase)],
//   exports: [AngularFireModule, AngularFireAuthModule],
// })
// export class AppFirebaseModule {
  
// }
import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth, Auth } from '@angular/fire/auth';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  exports: [Auth] // Correctly export the Auth service
})
export class AppFirebaseModule {}