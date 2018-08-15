import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ServicesProvider} from "../../providers/services/services";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {
  name: string;
  number: string;
  address: string;
  amount: string;
  description: string;

  cities: any;
  selectedCity: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private service: ServicesProvider,
              private loader: LoadingController,
              private storage: Storage,
              private toast: ToastController) {


    storage.get('cities').then(value => {
      if (value)
        this.cities = JSON.parse(value);
      else
        this._fetchCities();
    }, reason => {
      this._fetchCities()
    });
  }

  private _fetchCities() {
    let load = this.loader.create({content: "Loading..."});
    load.present();

    this.service.getCities().subscribe((value) => {
      this.cities = value;
      this.storage.set('cities', JSON.stringify(value));
      load.dismissAll();
    }, error1 => {
      load.dismissAll();
    });
  }

  onCreate() {
    if (this.address && this.amount && this.description && this.name && this.number && this.selectedCity
      && this.number.length == 11
    ) {
      let load = this.loader.create({content: "Loading..."});
      load.present();
      this.service.createBooking({
        address: this.address,
        amount: this.amount,
        description: this.description,
        name: this.name,
        number: this.number,
        city: this.selectedCity
      }).subscribe(value => {
        this.toast.create({message: "Order Created Successfully"}).present();
        load.dismissAll();
      }, error1 => {
        load.dismissAll();
      });
    } else {
      this.toast.create({message: "Please fill all required fields."}).present();
    }


  }
}
