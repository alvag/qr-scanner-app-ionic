import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from 'ionic-angular';
import { HistorialProvider } from '../../providers/historial/historial';

@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )
export class HomePage {

    constructor( private barcodeScanner: BarcodeScanner,
                 private toastCtrl: ToastController,
                 private platform: Platform,
                 private historialProvider: HistorialProvider ) {
    }

    scan() {

        if ( !this.platform.is( 'cordova' ) ) {
            this.historialProvider.agregarHistorial( 'http://google.com' );
            return;
        }

        this.barcodeScanner.scan().then( barcodeData => {
            console.log( 'Barcode data', barcodeData );

            if ( barcodeData.cancelled === false && barcodeData.text != null ) {
                this.historialProvider.agregarHistorial( barcodeData.text );
            }

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
