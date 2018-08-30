import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ScanData } from '../../models/scan-data.model';
import { ModalController, Platform } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
import { ToastProvider } from '../toast/toast';

@Injectable()
export class HistorialProvider {

    private historial: ScanData[] = [];

    constructor(private iab: InAppBrowser,
        private platform: Platform,
        private modalCtrl: ModalController,
        private contacts: Contacts,
        private toast: ToastProvider) {

    }

    cargarHistorial(): ScanData[] {
        return this.historial;
    }

    agregarHistorial(info: string) {
        let scanData = new ScanData(info);
        this.historial.unshift(scanData);

        console.log(this.historial);

        this.abrirScan(scanData);
    }

    abrirScan(scanData: ScanData) {

        switch (scanData.tipo) {
            case 'http':
                this.iab.create(scanData.info, '_system');
                break;
            case 'mapa':
                this.modalCtrl.create(MapaPage, { coords: scanData.info }).present();
                break;
            case 'contacto':
                this.crearContacto(scanData.info);
                break;
            default:
                console.log('Tipo no soportado');
        }
    }

    private crearContacto(texto: string) {
        let campos: any = this.parse_vcard(texto);
        console.log(campos);

        if (!this.platform.is('cordova')) {
            return;
        }

        let contact: Contact = this.contacts.create();
        contact.name = new ContactName(null, campos.fn);
        contact.phoneNumbers = [];
        campos.tel.forEach(x => {
            contact.phoneNumbers.push(new ContactField(x.meta.TYPE, x.value[0]));
        });

        contact.save().then(
            () => this.toast.presentToast('El contacto ha sido guardado'),
            (error) => this.toast.presentToast(`Error: ${error}`)
        );
    }

    private parse_vcard(input: string) {

        var Re1 = /^(version|fn|title|org):(.+)$/i;
        var Re2 = /^([^:;]+);([^:]+):(.+)$/;
        var ReKey = /item\d{1,2}\./;
        var fields = {};

        input.split(/\r\n|\r|\n/).forEach(function (line) {
            var results, key;

            if (Re1.test(line)) {
                results = line.match(Re1);
                key = results[1].toLowerCase();
                fields[key] = results[2];
            } else if (Re2.test(line)) {
                results = line.match(Re2);
                key = results[1].replace(ReKey, '').toLowerCase();

                var meta = {};
                results[2].split(';')
                    .map(function (p, i) {
                        var match = p.match(/([a-z]+)=(.*)/i);
                        if (match) {
                            return [match[1], match[2]];
                        } else {
                            return ["TYPE" + (i === 0 ? "" : i), p];
                        }
                    })
                    .forEach(function (p) {
                        meta[p[0]] = p[1];
                    });

                if (!fields[key]) fields[key] = [];

                fields[key].push({
                    meta: meta,
                    value: results[3].split(';')
                });
            }
        });

        return fields;
    }

}
