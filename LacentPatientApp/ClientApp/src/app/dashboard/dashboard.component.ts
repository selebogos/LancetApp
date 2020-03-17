import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  constructor(private register: RegisterService,private router:Router) { }
  IsLoggedIn=false;

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.LoginStatus$.subscribe((data: boolean) => 
    {
        console.log('am i logged in ', data);
        this.IsLoggedIn=data; 
    });

    if(!this.IsLoggedIn){
      this.router.navigate(['/login']);
    }

  }

}
