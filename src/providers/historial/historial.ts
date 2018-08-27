import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ScanData } from '../../models/scan-data.model';

@Injectable()
export class HistorialProvider {

    private historial: ScanData[] = [];

    constructor( private iab: InAppBrowser ) {

    }

    cargarHistorial(): ScanData[] {
        return this.historial;
    }

    agregarHistorial( info: string ) {
        let scanData = new ScanData( info );
        this.historial.unshift( scanData );
        console.log( this.historial );

        this.abrirScan( scanData );
    }

    abrirScan( scanData: ScanData ) {

        switch ( scanData.tipo ) {
            case 'http':
                this.iab.create( scanData.info, '_system' );
                break;
            default:
                console.log( 'Tipo no soportado' );
        }
    }

}
