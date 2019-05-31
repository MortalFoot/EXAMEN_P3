import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

 export const config = {
  apiKey: "AIzaSyDqnqqZi_KE1VrCfGrWGV3XjGnqjZbxvOo",
  authDomain: "ecologia-7da53.firebaseapp.com",
  databaseURL: "https://ecologia-7da53.firebaseio.com",
  projectId: "ecologia-7da53",
  storageBucket: "ecologia-7da53.appspot.com",
  messagingSenderId: "845807554510",
  appId: "1:845807554510:web:bc826367f1c4f905"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

