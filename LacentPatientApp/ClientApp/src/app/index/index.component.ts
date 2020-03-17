import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  constructor(private register: RegisterService,private router:Router) { }
  IsLoggedIn=false;

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    

  }

}
