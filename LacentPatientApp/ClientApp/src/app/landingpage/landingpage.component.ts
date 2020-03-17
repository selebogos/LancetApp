import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RegisterService } from '../register.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
  }

}
