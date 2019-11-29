import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { Purchase } from '../../../shared/classes/purchase';
import { User } from '../../../shared/classes/user';
import * as moment from 'moment';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';


@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {
  id: string;
  purchase = new Purchase();
  isLoading: Boolean = true;
  user = new User();
  datePickerConfig: any;
  test: any;
  treatedDate: string;

  constructor(private route: ActivatedRoute, private router: Router, private purchaseService: PurchaseService, private toastr: ToastrHelper) {
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

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getUserInformations();
    await this.getPurchaseById();
  }

  async getPurchaseById() {
    try {
      let response = await this.purchaseService.getById(this.id);
      this.treatedDate = moment(response['data'].purchaseDate).format('DD/MM/YYYY HH:mm');

      this.purchase = response['data'];
      this.purchase.purchaseDate = this.treatedDate;

      this.isLoading = false;

    } catch (err) {
      this.toastr.showError('Erro ao recuperar a compra', 'Erro');

      throw err;
    }
  }

  async updatePurchase() {
    try {
      let acumData = Object.assign({}, this.purchase);

      acumData.code = this.purchase.code;
      acumData.price = this.purchase.price;
      acumData.purchaseDate = moment(this.purchase.purchaseDate, 'DD/MM/YYYY').toISOString();
      acumData.status = this.purchase.status;

      await this.purchaseService.updatePurchase(acumData, this.id);

      this.toastr.showSuccess('Compra atualizada com sucesso', 'Sucesso');
      this.router.navigate(['/purchases'])

    } catch (err) {
      this.toastr.showError('Erro ao atualizar a compra', 'Erro');

      throw err;
    }
  }

  getUserInformations() {
    try {
      let storageUser = localStorage.getItem('userInformations')
      this.user = JSON.parse(storageUser).data;

    } catch (err) {
      this.toastr.showError('Erro ao recuperar as informações de usuário', 'Erro');
      throw err;
    }

  }

  cancel() {
    this.router.navigate(['/purchases']);
  }

}
