import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component( {
    selector: 'page-mapa',
    templateUrl: 'mapa.html',
} )
export class MapaPage {

    lat: number;
    lng: number;

    constructor( public navParams: NavParams ) {
        this.lat = -12.111062;
        this.lng = -77.0315913;
    }

}
