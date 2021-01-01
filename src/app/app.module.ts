import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//botsrap 


//import firebase
import { AngularFireModule } from '@angular/fire';
//import databse
import { AngularFireDatabaseModule } from '@angular/fire/database';
//Ma config Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyABQN9u5UZk1eOemEM1M9JmE-ymAL_aYjM",
  authDomain: "firstionic-1ea9d.firebaseapp.com",
  projectId: "firstionic-1ea9d",
  storageBucket: "firstionic-1ea9d.appspot.com",
  messagingSenderId: "717945993715",
  appId: "1:717945993715:web:63cd894ec7dc1b17bfba86",
  measurementId: "G-L1H5LXCJ5B"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
           IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig),//import de nos 2 modules angular
            //on initialize notre module au lancemant de notre apllication avec notre conbstante firebaseconfig
            AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
