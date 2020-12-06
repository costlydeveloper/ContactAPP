import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ServiceLocator} from './library/data-operation/locator.service';
import {CommonModule} from '@angular/common';
import {PopupDialogModule} from './library/dialog-system/dialog-definition/dialog.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggedUserPermissionsService} from './library/secure-data/logged-user-permissions.service';
import {PagesModule} from './pages/pages.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PopupDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        PagesModule
    ],
    providers   : [LoggedUserPermissionsService],
    
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = injector;
  }
}
