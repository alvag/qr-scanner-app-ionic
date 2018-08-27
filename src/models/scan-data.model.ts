export class ScanData {
    info: string;
    tipo: string;

    constructor( info: string ) {
        this.tipo = 'no definido';
        this.info = info;

        if ( info.startsWith( 'http' ) ) {
            this.tipo = 'http';
        } else if ( info.startsWith( 'geo' ) ) {
            this.tipo = 'mapa';
        }
    }
}
