import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  insertForm:FormGroup;
  Email:FormControl;
  returnUrl:string;
  ErrorMessage:string;
  invalidLogin:boolean;

  constructor(private register:RegisterService,private router:Router,private route:ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit() {
    this.Email = new FormControl('', [Validators.required, Validators.email]);
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.insertForm=this.fb.group({
      "Email":this.Email,
    });
  }

  onSubmit(){

    let userlogin=this.insertForm.value;
    if(userlogin.Email==="" || userlogin.Email==="" || userlogin.Email===undefined)
    {
      this.ErrorMessage="Please provide the email address!"
      return;
    }
    this.register.forgotPassword(userlogin.Email).subscribe(result=>{
      this.router.navigate(['/passwordresetrequest']);
    },
    error=>{
      this.invalidLogin=true;
      this.ErrorMessage="Please Provide the correct email";
      console.log(this.ErrorMessage);
    });
  }
}
