import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

    constructor(private toastCtrl: ToastController) {
    }

    presentToast(message: string, duration: number = 3000) {
        const toast = this.toastCtrl.create({
            message,
            duration
        });
        toast.present();
    }
}
