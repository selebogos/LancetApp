import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-pagecontent',
  templateUrl: './pagecontent.component.html',
  styleUrls: ['./pagecontent.component.css']
})
export class PagecontentComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  constructor(private register: RegisterService) { }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
  }

}
