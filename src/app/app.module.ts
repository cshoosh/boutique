import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ServicesProvider} from '../providers/services/services';
import {OrderDetailPage} from "../pages/order-detail/order-detail";
import {NewOrderPage} from "../pages/new-order/new-order";
import {HttpClientModule} from "@angular/common/http";
import {SelectSearchableModule} from "ionic-select-searchable";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    NewOrderPage,
    TabsPage,
    OrderDetailPage
  ],
  imports: [
    BrowserModule,
    SelectSearchableModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewOrderPage,
    AboutPage,
    HomePage,
    TabsPage,
    OrderDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {
}
