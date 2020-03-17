import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-customertype',
  templateUrl: './customertype.component.html',
  styleUrls: ['./customertype.component.css']
})
export class CustomertypeComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidCustomerType = false;
  isSuccessful = false;
  customerTypes=[];

  constructor(private customerService: CustomerService, private register: RegisterService,
     private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

  }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
    this.successMessage = "";
    this.errorList = [];

    this.LoginStatus$.subscribe((data: boolean) => {
      console.log('am i logged in ', data);
      this.IsLoggedIn = data;

    });


    if (!this.IsLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();

    this.errorList = [];
    this.Name = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.insertForm = this.fb.group({

    "Name": this.Name

    });

  }

  onSave() {

    try {
      this.invalidCustomerType=false;
      this.errorList=[];
      let details = this.insertForm.value;
      this.customerService.addCustomerType(details.Name).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/customertypes"]);
          this.successMessage = result.message;
          this.invalidCustomerType = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidCustomerType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;
       // this.router.navigate(['/customertypes']);

      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidCustomerType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidCustomerType = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }


  getCustomerTypes(){

    try{

      this.customerTypes =this.customerService.getCustomerTypes();

      return this.customerTypes;
    } catch(e){

    }
  }


}
