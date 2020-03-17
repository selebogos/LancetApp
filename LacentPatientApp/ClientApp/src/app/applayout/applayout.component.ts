import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-applayout',
  templateUrl: './applayout.component.html',
  styleUrls: ['./applayout.component.css']
})
export class ApplayoutComponent implements OnInit, AfterViewInit  {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  //@ViewChild('pageTop', { static: false }) myDiv: ElementRef;
  constructor(private register: RegisterService) {

  }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
  }
 // @ViewChild('toggle', {static: false}) myDiv: ElementRef;

 
  ngAfterViewInit() {
    //console.log(this.myDiv.nativeElement);
  }
  public onLogout() {
    this.register.logout();
  }

}
