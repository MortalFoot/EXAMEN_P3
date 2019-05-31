import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import * as firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';


/**
 * Generated class for the ImagenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagen',
  templateUrl: 'imagen.html',
})
export class ImagenPage {

  imagen;

  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user: firebase.User;
  
  posicion = '';
  Tipoar = ' ';
  anchoc = ' ';
  anchot = ' ';
  Latitud = 0;
  Longitud = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
            public loadingCtrl: LoadingController,
          private geolocation: Geolocation) {
    this.imagen = this.navParams.get('imagen');
    this.geolocation.getCurrentPosition().then((resp) => {
       this.Latitud = resp.coords.latitude;
       this.Longitud = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.storage = firebase.storage();
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenPage');
  }

  subirImagen()
  {
    let imagen = {
      Tipoar: this.Tipoar,
      anchoc: this.anchoc,
      anchot: this.anchot,
      Longitud: this.Longitud,
      Latitud: this.Latitud,
      url: '',
      user: this.user.uid
    };

    let loading = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loading.present();


    this.db.collection('imagenes').add(imagen)
    .then(ref => {
      let nombre = ref.id;

      let uploadTask= this.storage.ref ('imagenes/' + nombre +'.jpg').putString(this.imagen, 'data_url');
      
      
      uploadTask.then( exito =>{
        loading.dismiss();
        let url = exito.downloadURL;
        ref.update({url: url})
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
    })
  
  
  }
}
