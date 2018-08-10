import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {IRecord, ServicesProvider} from "../../providers/services/services";
import {OrderDetailPage} from "../order-detail/order-detail";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  records: Array<IRecord>;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private service: ServicesProvider,
              private loader: LoadingController) {
    this.fetchRecords();
  }

  private fetchRecords() {
    let load = this.loader.create({content: 'Loading...'});
    load.present();


      this.service.getRecords()
        .then((database) => {
          this.records = database;
          load.dismiss();
        }).catch(() => {
        load.dismiss();
      });
  }


  private showMessage(msg: string) {
    this.toastCtrl.create({message: msg, duration: 3000})
      .present();
  }

  onItemClick(record: IRecord) {
    this.navCtrl.push(OrderDetailPage, {'record': record})
  }

  refreshList() {
    this.fetchRecords()
  }

  deleteRecord(record: IRecord) {
    this.service.deleteRecord(record._id)
      .then(()=> {
        this.showMessage("Record deleted successfully..");
        this.fetchRecords();
      }).catch(()=> {
        this.showMessage('Unable to delete this record!!');
    })
  }
}
