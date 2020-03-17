import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { PaymentmethodService } from '../paymentmethod.service';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.css']
})
export class PaymentmethodComponent implements OnInit {

 
  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidPaymentMethodType = false;
  isSuccessful = false;

  constructor(private washtypeService: PaymentmethodService, private register: RegisterService, private router: Router, private fb: FormBuilder) {

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


    this.errorList = [];
    this.Name = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.insertForm = this.fb.group({

      "Name": this.Name

    });

  }

  onSave() {

    try {
      let details = this.insertForm.value;
      this.washtypeService.addPaymentMethodType(details.Name).subscribe(result => {

        if (result.message === "Successful") {
          this.successMessage = result.message;
          this.invalidPaymentMethodType = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidPaymentMethodType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;


      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidPaymentMethodType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidPaymentMethodType = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }


}
