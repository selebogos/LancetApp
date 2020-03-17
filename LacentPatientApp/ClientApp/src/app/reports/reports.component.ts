import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { RegisterService } from '../register.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatUIService } from '../activat-ui.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  toDate: FormControl;
  fromDate: FormControl;
  insertForm: FormGroup;
  email:FormControl;
  errorList: string[];
  successMessage;
  invalidReport = false;
  isSuccessful = false;
  customerTypes=[];

  constructor(private reportService: ReportService,private SpinnerService: NgxSpinnerService,
    private router: Router, private fb: FormBuilder,
    private register: RegisterService,private activateUIService:ActivatUIService) {

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
    this.fromDate = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.toDate = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.email=new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.insertForm = this.fb.group({

    "fromDate": this.fromDate,
    "toDate": this.toDate,
    "email":this.email

    });

  }

  generateReport() {

    try {
      let details = this.insertForm.value;
      this.invalidReport=false;
      this.errorList=[];
      this.SpinnerService.show();
      if(details.fromDate===undefined || details.fromDate==="" || details.fromDate===" ")
      {
        this.isSuccessful =false;
        this.SpinnerService.hide();
        this.invalidReport=true;
        this.errorList.push("Please the from-date");
        return;
      }
      else if(details.toDate===undefined || details.toDate==="" || details.toDate===" ")
      {
        this.SpinnerService.hide();
        this.isSuccessful = false;
        this.invalidReport=true;
        this.errorList.push("Please provide the to-date");
        return;
      }
      else if(details.email===undefined || details.email==="" || details.email===" ")
      {
        this.SpinnerService.hide();
        this.isSuccessful = false;
        this.invalidReport=true;
        this.errorList.push("Please provide the email address");
        return;
      }
      this.reportService.download(details.email,details.fromDate,details.toDate).subscribe(result => {
        this.SpinnerService.hide();
        if (result.message === "Successful") {

          this.successMessage = "Email sent.";
          this.invalidReport = false;
          this.isSuccessful = true;

        }
        else {
          this.errorList.push(result.message);
          this.invalidReport = true;
          this.isSuccessful = false;
          this.insertForm.controls['fromDate'].enable();
          this.insertForm.controls['toDate'].enable();
          this.insertForm.controls['email'].enable();
        }
        return;
       // this.router.navigate(['/customertypes']);

      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          this.errorList.push(error);
          this.invalidReport = true;
          this.isSuccessful = false;
          this.insertForm.controls['fromDate'].enable();
          this.insertForm.controls['toDate'].enable();
          this.insertForm.controls['email'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidReport = true;
      this.isSuccessful = false;
      this.insertForm.controls['fromDate'].enable();
          this.insertForm.controls['toDate'].enable();
          this.insertForm.controls['email'].enable();
    }
    return;

  }

}
