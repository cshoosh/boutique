import {Injectable} from '@angular/core';
import * as firebase from 'firebase'
import DocumentReference = firebase.firestore.DocumentReference;

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {


  constructor() {
    console.log('Hello ServicesProvider Provider');
    let config = {
      apiKey: "AIzaSyBq0bNHjQMGZTGisPxaLuI7gXRmh8nnTw0",
      authDomain: "boutique-33368.firebaseapp.com",
      databaseURL: "https://boutique-33368.firebaseio.com",
      projectId: "boutique-33368",
      storageBucket: "boutique-33368.appspot.com",
      messagingSenderId: "959835738445"
    };

    firebase.initializeApp(config);

  }

  addRecord(record: IRecord): Promise<DocumentReference> {

    record.time = new Date().getTime();

    return firebase.firestore().collection('Records')
      .add(record);
  }

  deleteRecord(_id: string): Promise<any> {
    return firebase.firestore().collection('Records')
      .doc(_id)
      .delete()
  }

  getRecords(): Promise<IRecord[]> {

    return new Promise<IRecord[]>(
      (resolve, reject) => {
        firebase.firestore().collection('Records')
          .orderBy('time', "desc")
          .get()
          .then((database) => {
            resolve(database.docs.map((value): IRecord => {
              let doc = value.data();

              return {
                dealerPrice: doc["dealerPrice"],
                product: doc["product"],
                time: doc["time"],
                clientName: doc["clientName"],
                clientCity: doc["clientCity"],
                dc: doc["dc"],
                dealerName: doc["dealerName"],
                soldPrice: doc["soldPrice"],
                _id: value.id
              }
            }))
          })
          .catch((error) => {
            reject(error);
          })
      }
    );

  }

}

export interface IRecord {
  dealerName: string,
  product: string,
  dealerPrice: number,
  dc: number,
  soldPrice: number,
  clientName: string,
  clientCity: string,
  time?: number,
  _id?: string
}
