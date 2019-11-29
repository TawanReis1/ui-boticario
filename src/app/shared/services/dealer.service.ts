import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  url: string;
  isAuthenticated = new EventEmitter<Boolean>();

  constructor(private http: HttpClient) {
    this.url = "http://localhost:4000/api/v1/dealer";
  }

  async getDealerById(id, token) {
    return this.http.get(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        "x-access-token": token
      })
    })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }


}
