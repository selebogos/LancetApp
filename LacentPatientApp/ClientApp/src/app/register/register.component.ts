import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from '../register.service';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  insertForm:FormGroup;
  Email:FormControl;
  Password:FormControl;
  RepeatPassword:FormControl;
  FirstName:FormControl;
  LastName:FormControl;
  returnUrl:string;
  ErrorMessage:string;
  invalidLogin:boolean;
  errorList: string[];

  constructor(private register:RegisterService,private router:Router,private fb:FormBuilder
    ,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.Email = new FormControl('', [Validators.required, Validators.email]);
    this.FirstName = new FormControl('', [Validators.required, , Validators.maxLength(15), Validators.minLength(3)]);
    this.LastName = new FormControl();
    this.Password = new FormControl('', [Validators.required,Validators.maxLength(15), Validators.minLength(8)]);
    this.RepeatPassword = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]);
    this.errorList=[];
    this.Email.setValue("");
    this.insertForm=this.fb.group({
      "Password":this.Password,
      "RepeatPassword":this.RepeatPassword,
      "Email":this.Email,
      "FirstName":this.FirstName,
      "LastName":this.LastName
    });
  }
  onSubmit(){
    this.invalidLogin=false;
    this.errorList=[];
    this.SpinnerService.show();
    let userDetails=this.insertForm.value;

    if(userDetails.FirstName===undefined || userDetails.FirstName==="" || userDetails.FirstName===" "){
      this.invalidLogin=true;
      this.errorList.push("Please provide the first name");
      return;
    }
    else if(userDetails.Email===undefined || userDetails.Email==="" || userDetails.Email===" "){
      this.invalidLogin=true;
      this.errorList.push("Please provide the email");
      return;
    }
    else if(userDetails.Password===undefined || userDetails.Password==="" || userDetails.Password===" "){
      this.invalidLogin=true;
      this.errorList.push("Please ensure that the passwords are the same");
      return;
    }
    else if(userDetails.Password !== userDetails.RepeatPassword){
      this.invalidLogin=true;
      this.errorList.push("Please ensure that the passwords are the same");
      return;
    }
    else if(userDetails.Password<8){
      this.invalidLogin=true;
      this.errorList.push("Please ensure the length of the passsword is greater that 7 and has special character(s) & has lower and upper case.");
      return;
    }

    this.register.register(userDetails.FirstName,userDetails.LastName,userDetails.Password,userDetails.Email).subscribe(result=>{
      this.invalidLogin=false;
      this.SpinnerService.hide();
      if(result.message==="Registration Successful")
        this.router.navigate(['/confirmregistration']);
      else{
        this.invalidLogin=true;
        console.log(result);
        for(var i=0;i<result.errorList.length;i++){
          this.errorList.push(result.errorList[i]);
        }
      }

    },
    error=>{
      console.log(error);
      this.SpinnerService.hide();
      this.invalidLogin=true;
      this.errorList.push("Please ensure that the passwords match,include numbers and special characters @!$&^%)(#.The password must at least be 8 characters long");
      return;
    }
    );
  }


}
