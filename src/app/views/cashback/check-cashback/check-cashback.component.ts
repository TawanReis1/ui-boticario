import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-cashback',
  templateUrl: './check-cashback.component.html',
  styleUrls: ['./check-cashback.component.scss']
})
export class CheckCashbackComponent implements OnInit {
  document: string = "";
  cashbackValue: any;
  isLoading: Boolean;

  constructor(private purchaseService: PurchaseService, private toastr: ToastrHelper, private router: Router) { }

  ngOnInit() {
  }

  async getCashbackValue(document) {
    try {
      this.isLoading = true;
      this.cashbackValue = await this.purchaseService.getCashbackValueByDealerDocument(document);
      this.cashbackValue = this.cashbackValue.data.body.credit;
      this.toastr.showSuccess('Valor do Cashback acumulado recuperado com sucesso', 'Sucesso');
      this.isLoading = false;
    } catch (err) {
      this.toastr.showError('Erro ao recuperar o valor do Cashback acumulado', 'Erro');
      throw err;
    }
  }

  cancel() {
    this.router.navigate(['/purchases']);
  }

}
