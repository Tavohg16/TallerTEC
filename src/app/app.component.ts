import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { LoginResponse } from './services/login/login.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taller-tec';
  
  constructor(protected loginService: LoginService) {}

  logout() {
    this.loginService.logout();
  }

}
