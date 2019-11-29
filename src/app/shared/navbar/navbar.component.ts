import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { EventEmitterService } from '../helpers/event-emitter';
import * as jwt_decode from "jwt-decode";
import { DealerService } from '../services/dealer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth: any;
  authInformations: any;
  userInformations: any;

  constructor(private router: Router, private loginService: LoginService, private dealerService: DealerService) {
    if (localStorage.getItem('auth')) {
      this.isAuth = true;
      this.authInformations = localStorage.getItem('auth')
      this.authInformations = JSON.parse(this.authInformations);
    }

    EventEmitterService.get('login').subscribe(() => {
      this.isAuth = true;
    });

    if (localStorage.getItem('logout')) {
      this.isAuth = false;
    }
  }

  ngOnInit() {
    this.getUserInformations();
  }

  async getUserInformations() {
    if (this.authInformations) {
      let user = jwt_decode(this.authInformations.accessToken);
      this.userInformations = await this.dealerService.getDealerById(user.id, this.authInformations.accessToken)
      localStorage.setItem('userInformations', JSON.stringify(this.userInformations, null, 4));
    }  
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    EventEmitterService.get('logout').emit(true);
  }

}
