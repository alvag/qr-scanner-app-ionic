import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';

@Injectable()
export class HistorialProvider {

    private historial: ScanData[] = [];

    constructor() {

    }

    cargarHistorial() {
        return this.historial;
    }

    agregarHistorial( info: string ) {
        let data = new ScanData( info );
        this.historial.unshift( data );
        console.log( this.historial );
    }

}
