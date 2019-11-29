import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url: string = "http://localhost:4000/api/v1/purchase";
  authInformations: any;

  constructor(private http: HttpClient) {
    this.authInformations = localStorage.getItem('auth');
    this.authInformations = JSON.parse(this.authInformations);
  }

  async get(query) {
    let params = new HttpParams();
    Object.keys(query).forEach(param => {
      params = params.append(param, query[param]);
    });

    return this.http.get(this.url, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      }),
      params
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async getById(id) {
    return this.http.get(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async getCashbackValueByDealerDocument(cpf) {
    return this.http.get(`${this.url}/external/cashback/${cpf}`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async create(purchase) {
    const body = {
      code: purchase.code,
      price: purchase.price,
      purchaseDate: purchase.purchaseDate,
      dealer: purchase.dealer
    };

    return this.http.post(this.url, body, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async updatePurchase(body, id) {
    return this.http.put(`${this.url}/${id} `, body, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async delete(id) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }
}
