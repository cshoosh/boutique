import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {ServicesProvider} from "../../providers/services/services";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dealerName: string;
  productDescription: string;
  dealerPrice: number;
  deliveryCharges: number;
  soldPrice: number;
  clientName: string;
  clientLocation: string;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private loader: LoadingController,
              private service: ServicesProvider) {

  }

  onAdd() {
    if (this.dealerName && this.productDescription && this.clientName && this.clientLocation
      && this.dealerPrice && this.deliveryCharges && this.soldPrice) {

      let loader = this.loader.create({content: "Loading"});
      loader.present();

      this.service.addRecord({
        dealerName: this.dealerName,
        product: this.productDescription,
        dealerPrice: this.dealerPrice,
        dc: this.deliveryCharges,
        soldPrice: this.soldPrice,
        clientName: this.clientName,
        clientCity: this.clientLocation
      }).then(() => {
        loader.dismiss();
        this.showMessage("Record added successfully");
      }).catch(() => {
        loader.dismiss();
        this.showMessage("There was an error, Cannot add new record.");
      })

    } else {
      this.showMessage("Please, Fill all the entries.");
    }
  }

  private showMessage(msg: string) {
    this.toastCtrl.create({message: msg, duration: 3000})
      .present();
  }

}
