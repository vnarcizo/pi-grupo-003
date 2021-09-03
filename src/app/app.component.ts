import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'My Angular App';
  public isAuthenticated: boolean = false;

  constructor() {
    
  }

  async ngOnInit() {
    this.isAuthenticated = true; //await this.oktaAuth.isAuthenticated();
  }

  login() {
    //this.oktaAuth.loginRedirect();
  }

  logout() {
    //this.oktaAuth.logout('/');
  }
}