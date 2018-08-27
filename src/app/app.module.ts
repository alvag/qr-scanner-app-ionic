import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GuardadosPage } from '../pages/guardados/guardados';
import { MapaPage } from '../pages/mapa/mapa';
import { TabsPage } from '../pages/tabs/tabs';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HistorialProvider } from '../providers/historial/historial';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule( {
    declarations: [
        MyApp,
        HomePage,
        GuardadosPage,
        MapaPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot( MyApp ),
        AgmCoreModule.forRoot( {
            apiKey: ''
        } )
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [
        MyApp,
        HomePage,
        GuardadosPage,
        MapaPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        InAppBrowser,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        HistorialProvider
    ]
} )
export class AppModule {}
