import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './shared/security/authorize-guard';

import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginComponent } from './views/login/login.component';
import { NewPurchaseComponent } from './views/purchases/new-purchase/new-purchase.component';
import { PurchaseListComponent } from './views/purchases/purchase-list/purchase-list.component';
import { PurchaseDetailsComponent } from './views/purchases/purchase-details/purchase-detail.component';
import { CheckCashbackComponent } from './views/cashback/check-cashback/check-cashback.component';
import { ProjectInformationsComponent } from './views/project-informations/project-informations.component'


const routes: Routes = [
  {
    path: '', component: NavbarComponent, canActivate: [AuthorizeGuard],
    children: [
      { path: 'purchases', component: PurchaseListComponent },
      { path: 'purchases/:id', component: PurchaseDetailsComponent },
      { path: 'purchases/new/purchase', component: NewPurchaseComponent },
      { path: 'purchases/consult/cashback', component: CheckCashbackComponent },

      { path: 'informations', component: ProjectInformationsComponent }
    ]
  },
  {
    path: '', component: NavbarComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
