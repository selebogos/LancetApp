
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { RegisterService } from './register.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  //@ViewChild('pageTop', { static: false }) myDiv: ElementRef;
  constructor(private register: RegisterService) {

  }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
  }

  ngAfterViewInit() {
    //console.log(this.myDiv.nativeElement);
  }

  title = 'ClientApp';
  isCollapsed = false;

  
  public AddToggle(event:any) {
    //this.render.addClass(event.target, 'toggled');
     alert("Hello");
  }


 
}
