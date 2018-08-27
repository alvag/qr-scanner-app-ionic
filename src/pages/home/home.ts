import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';


@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )
export class HomePage {

    constructor( private barcodeScanner: BarcodeScanner,
                 private toastCtrl: ToastController ) {
    }

    scan() {
        this.barcodeScanner.scan().then( barcodeData => {
            console.log( 'Barcode data', barcodeData );
        } ).catch( error => {
            console.log( 'Error', error );
            this.presentToast( `Error: ${error}` );
        } );
    }

    presentToast( message: string ) {
        const toast = this.toastCtrl.create( {
            message: message,
            duration: 3000
        } );
        toast.present();
    }

}
