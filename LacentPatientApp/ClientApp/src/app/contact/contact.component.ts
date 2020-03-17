import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
  }

}
