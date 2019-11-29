import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../shared/services/purchase.service';
import { Purchase } from '../../../shared/classes/purchase';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss']
})
export class NewPurchaseComponent implements OnInit {
  user: any;
  purchase: Purchase = new Purchase();
  authInformations: any;
  datePickerConfig: any;

  constructor(private purchaseService: PurchaseService, private toastr: ToastrHelper, private router: Router) {
    this.datePickerConfig = {
      firstDayOfWeek: 'su',
      monthFormat: 'MMM, YYYY',
      disableKeypress: false,
      allowMultiSelect: false,
      onOpenDelay: 0,
      weekDayFormat: 'ddd',
      appendTo: document.body,
      drops: 'down',
      opens: 'right',
      showNearMonthDays: true,
      showWeekNumbers: false,
      enableMonthSelector: true,
      format: "DD/MM/YYYY HH:mm",
      yearFormat: 'YYYY',
      showGoToCurrent: true,
      dayBtnFormat: 'DD',
      monthBtnFormat: 'MMM',
      hours12Format: 'hh',
      hours24Format: 'HH',
      meridiemFormat: 'A',
      minutesFormat: 'mm',
      minutesInterval: 1,
      secondsFormat: 'ss',
      secondsInterval: 1,
      showSeconds: false,
      showTwentyFourHours: true,
      timeSeparator: ':',
      multipleYearsNavigateBy: 10,
      showMultipleYearsNavigation: false,
      locale: 'pt-BR',
    }
  }

  ngOnInit() {
    this.getUserInformations();
  }

  getUserInformations() {
    this.user = localStorage.getItem('userInformations')
    this.user = JSON.parse(this.user).data;
  }

  async createPurchase() {
    try {
      this.purchase['dealer'] = this.user.document;
      await this.purchaseService.create(this.purchase);

      this.toastr.showSuccess('Venda criada com sucesso!', 'Sucesso');
      this.router.navigate(['/purchases']);

      return;

    } catch (err) {
      this.toastr.showError('Erro ao criar venda', 'Erro')
      throw err;
    }
  }

  cancel() {
    this.router.navigate(['/purchases']);
  }
}
