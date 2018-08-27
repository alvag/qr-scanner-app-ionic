import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { GuardadosPage } from '../guardados/guardados';

@Component( {
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
} )
export class TabsPage {

    tab1: any = HomePage;
    tab2: any = GuardadosPage;

    constructor() {
    }

}
