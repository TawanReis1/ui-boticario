import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from '../../../shared/classes/purchase';
import { PurchaseService } from '../../../shared/services/purchase.service';
import { ToastrHelper } from 'src/app/shared/helpers/toastr';
import * as moment from 'moment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  purchase = new Purchase();
  isLoading: Boolean;
  allPurchases: any = {
    data: [],
    meta: {}
  };
  page: Number = 1;
  filterFields: any = {};
  filterCode: string;
  filterPurchaseDate: string;
  filterCashbackPercentage: string;
  filterStatus: string;
  datePickerConfig: any;

  constructor(private router: Router, private purchaseService: PurchaseService, private toastr: ToastrHelper) {
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
      format: "DD/MM/YYYY",
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
    await this.getPurchases()
  }

  async getPurchases(filterFields = {}) {
    try {
      this.isLoading = true;
      if (Object.keys(filterFields).length === 0) {
        filterFields = { page: this.page, limit: 10 }
      }

      let response = await this.purchaseService.get(filterFields);

      this.allPurchases.data = response['data'];
      this.allPurchases.meta = response['meta'];

      this.isLoading = false;

    } catch (err) {
      this.toastr.showError('Erro ao listar as compras', 'Erro');
      throw err;
    }
  }

  applyFilter() {
    try {
      this.filterFields = {
        filter_code: this.filterCode,
        filter_purchaseDate: this.filterPurchaseDate ? moment(this.filterPurchaseDate).format('YYYY-MM-DD') : "",
        filter_cashbackPercentage: this.filterCashbackPercentage,
        filter_status: this.filterStatus
      }

      this.formatFilterFields();
      this.getPurchases(this.filterFields);
    } catch (err) {
      this.toastr.showError('Erro ao filtrar as compras', 'Erro');
      throw err;
    }

  }

  clearFilter() {
    try {
      this.filterCode = "";
      this.filterPurchaseDate = "";
      this.filterStatus = "";
      this.getPurchases();
    } catch (err) {
      this.toastr.showError('Erro ao limpar os campos do filtro', 'Erro');
      throw err;
    }
  }

  async changePage(page) {
    try {
      this.page = page;
      this.filterFields['page'] = this.page;

      this.formatFilterFields();
      await this.getPurchases(this.filterFields)

    } catch (err) {
      this.toastr.showError('Erro ao acessar outra página', 'Erro');
      throw err;
    }
  }

  changeScreen(screen, id) {
    try {
      if (screen === 'new') {
        this.router.navigate(['/purchases/new/purchase']);
      } else if (screen === 'cashback') {
        this.router.navigate(['/purchases/consult/cashback/']);
      } else {
        this.router.navigate(['/purchases/', id]);
      }

    } catch (err) {
      this.toastr.showError('Erro ao acessar outra tela', 'Erro');
      throw err;
    }
  }

  formatFilterFields() {
    for (let key in this.filterFields) {
      if (!this.filterFields[key]) delete this.filterFields[key]
    }
  }

  async deletePurchase(id, i) {
    swal({
      title: 'Você tem certeza?',
      text: 'Você não será capaz de reverter isso!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#DDDDDD',
      confirmButtonColor: '#F5821F',
      confirmButtonText: 'Sim, apague!',
      reverseButtons: true

    }).then((result) => {
      if (result.value) {
        this.purchaseService.delete(id)
          .then(res => {
            this.allPurchases.data.splice(i, 1);
          });
        swal(
          'Apagado!',
          'Sua compra foi apagada com sucesso.',
          'success'
        );
      }
    });
  }

  enterDetails(id) {
    this.router.navigate(['/purchases', id]);
  }
}
