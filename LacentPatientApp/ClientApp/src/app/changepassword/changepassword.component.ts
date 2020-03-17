import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../_models/UserModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { debug } from 'util';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  UserRole: FormControl;
  CurrentPassword: FormControl;
  Password: FormControl;
  RepeatPassword: FormControl;

  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidPassword = false;
  isSuccessful = false;
  User:UserModel;
  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private customerService:CustomerService,private router: Router,private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,private activateUIService:ActivatUIService) {
  }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.LoginStatus$.subscribe((data: boolean) =>
    {
        console.log('am i logged in ', data);
        this.IsLoggedIn = data;
    });

    if(!this.IsLoggedIn){
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();
    //this.customerTypes = this.customerService.getCustomerTypes();
    this.User = new UserModel();
    this.errorList = [];
    this.CurrentPassword = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Password = new FormControl('', [Validators.required,Validators.maxLength(15), Validators.minLength(8)]);
    this.RepeatPassword = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]);
    this.insertForm = this.fb.group({
      "CurrentPassword": this.CurrentPassword,
      "Password":this.Password,
      "RepeatPassword":this.RepeatPassword,
    });
  }

  onSave() {

    try {
      this.SpinnerService.show();
      this.errorList=[];
      this.invalidPassword=false;
      let details = this.insertForm.value;
      if(details.CurrentPassword===null || details.CurrentPassword===undefined || details.CurrentPassword==="" || details.CurrentPassword===" "){
        this.SpinnerService.hide();
        this.invalidPassword=true;
        this.errorList.push("Please provide your current passsword");
        return;
      }
      else if(details.Password===null || details.Password===undefined || details.Password==="" || details.Password===" "){
        this.SpinnerService.hide();
        this.invalidPassword=true;
        this.errorList.push("Please provide the password");
        return;
      }
      else if(details.RepeatPassword===null || details.RepeatPassword===undefined || details.RepeatPassword==="" || details.RepeatPassword===" "){
        this.SpinnerService.hide();
        this.invalidPassword=true;
        this.errorList.push("Please provide the repeat password");
        return;
      }
      else if(details.Password !== details.RepeatPassword){
        this.SpinnerService.hide();
        this.invalidPassword=true;
        this.errorList.push("Please provide the ensure that the passwords are the same");
        return;
      }
      this.register.changePassword(details.CurrentPassword,
        details.RepeatPassword,details.Password).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/home"]);
        }
        else {
          this.errorList.push(result.message);
          this.invalidPassword = true;
          this.isSuccessful = false;
          this.insertForm.controls['UserRole'].enable();
          this.insertForm.controls['FirstName'].enable();
          this.insertForm.controls['LastName'].enable();
          this.insertForm.controls['Password'].enable();
          this.insertForm.controls['RepeatPassword'].enable();
        }
        return;
      },
        error => {
          console.log(error);
          this.SpinnerService.hide();
          for(let i=0;i<error.error.value.length;i++){
            this.errorList.push(error.error.value[i]);
          }
          this.invalidPassword = true;
          this.isSuccessful = false;
        }
      );
    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidPassword = true;
      this.isSuccessful = false;

    }
    return;
  }


}
