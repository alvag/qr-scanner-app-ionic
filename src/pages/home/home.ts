import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )
export class HomePage {

    constructor( private barcodeScanner: BarcodeScanner ) {
    }

    scan() {
        this.barcodeScanner.scan().then( barcodeData => {
            console.log( 'Barcode data', barcodeData );
        } ).catch( err => {
            console.log( 'Error', err );
        } );
    }

}
