import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrHelper } from './shared/helpers/toastr';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewPurchaseComponent } from './views/purchases/new-purchase/new-purchase.component';
import { PurchaseDetailsComponent } from './views/purchases/purchase-details/purchase-detail.component';
import { PurchaseListComponent } from './views/purchases/purchase-list/purchase-list.component';
import { CheckCashbackComponent } from './views/cashback/check-cashback/check-cashback.component';
import { AuthorizeGuard } from './shared/security/authorize-guard';
import { ProjectInformationsComponent } from './views/project-informations/project-informations.component';
import { LoaderComponent } from './shared/helpers/loader/loader.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NewPurchaseComponent,
    PurchaseDetailsComponent,
    PurchaseListComponent,
    CheckCashbackComponent,
    ProjectInformationsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DpDatePickerModule,
    NgbModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    AuthorizeGuard,
    ToastrHelper,
    ToastrService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
