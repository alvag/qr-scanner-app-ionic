export class ScanData {
    info: string;
    tipo: string;

    constructor(info: string) {
        this.tipo = 'no definido';
        this.info = info;

        if (info.startsWith('http')) {
            this.tipo = 'http';
        } else if (info.startsWith('geo')) {
            this.tipo = 'mapa';
        } else if (info.startsWith('BEGIN:VCARD')) {
            this.tipo = 'contacto';
        } else if (info.startsWith('MATMSG')) {
            this.tipo = 'email';
        }
    }
}
