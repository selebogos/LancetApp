import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  insertForm:FormGroup;
  Email:FormControl;
  Password:FormControl;
  returnUrl:string;
  ErrorMessage:string;
  invalidLogin:boolean;

  constructor(private register:RegisterService,private router:Router,
    private route:ActivatedRoute,private fb:FormBuilder,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.Email = new FormControl('', [Validators.required, Validators.email]);
    this.Password = new FormControl('', [Validators.required,Validators.maxLength(15), Validators.minLength(2)]);
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.insertForm=this.fb.group({
      "Email":this.Email,
      "Password":this.Password
    });
  }

  onSubmit(){
    this.SpinnerService.show();
    this.invalidLogin=false;
    this.ErrorMessage="";
    let userlogin=this.insertForm.value;

    localStorage.setItem('loginStatus','0');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');

    this.register.login(userlogin.Email,userlogin.Password).subscribe(result=>{
      this.SpinnerService.hide();
      let token=(<any>result).token;
      console.log(token);
      console.log(result.userRole);
      console.log("User is successfully logged in");
      this.router.navigate(['/home']);
    },
    error=>{
      this.SpinnerService.hide();
      this.invalidLogin=true;
      this.ErrorMessage="Invalid login details provided,please try again";
      console.log(this.ErrorMessage);
    });

  }

}
