import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  year:number=new Date().getFullYear();
  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
  }
}
