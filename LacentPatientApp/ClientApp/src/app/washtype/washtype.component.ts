import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

import { WashtypeService } from '../washtype.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-washtype',
  templateUrl: './washtype.component.html',
  styleUrls: ['./washtype.component.css']
})
export class WashtypeComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidWashType = false;
  isSuccessful = false;

  constructor(private washtypeService: WashtypeService, private register: RegisterService,
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
      this.errorList=[];
      this.invalidWashType = false;
      let details = this.insertForm.value;
      if(details.Name===null || details.Name===undefined || details.Name==="" || details.Name===" ")
      {
        this.invalidWashType=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      this.washtypeService.addWashType(details.Name).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/washtypes"]);
          this.successMessage = result.message;
          this.invalidWashType = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidWashType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;


      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidWashType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidWashType = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }


}
