import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  Userrole$: Observable<string>;
  customerTypes=<any>[];

  CustomerType: FormControl;
  VehicleRegistration: FormControl;
  Make: FormControl;
  Description: FormControl;
  Contact: FormControl;

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidCustomer = false;
  isSuccessful = false;
  selectedOption:FormControl;
  Name:FormControl;
  Branch : FormControl;
  userrole:string;
  IsRightUser:boolean;
  roles:any;
  branches = <any>[];
  selectedBranchOption: string;

  constructor(private register: RegisterService,private customerService:CustomerService,
    private router: Router, private fb: FormBuilder,private SpinnerService: NgxSpinnerService,
    private branchService:BranchService,private activateUIService:ActivatUIService) {

    this.branchService.getBranches().subscribe(
      data => {
        this.branches = data as any[];
        console.log(this.branches);
      },
      error => {
        console.log("Error:Problem getting the branches "+ error);

    });

    this.customerService.getCustomerTypes().subscribe(

      data => {
        this.customerTypes = data as any[];
        console.log(this.customerTypes);
      },
      error => {
        console.log("Error:Problem getting the customer types " + error);

    });
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
    this.errorList = [];
    this.CustomerType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.VehicleRegistration = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.insertForm = this.fb.group({

      "CustomerType": this.CustomerType,
      "VehicleRegistration": this.VehicleRegistration,
      "Make": this.Make,
      "Description": this.Description,
      "Contact": this.Contact,
      "Name":this.Name,
    });

  }

  onSave() {

    try {
      this.invalidCustomer = false;
      this.errorList=[];
      this.SpinnerService.show();
      let details = this.insertForm.value;
      this.CustomerType = this.selectedOption;
      details.CustomerType=this.CustomerType;
      if(details.CustomerType==="Please Select" || details.CustomerType===null || details.CustomerType===undefined || details.CustomerType==="" || details.CustomerType===" ")
      {
        this.SpinnerService.hide();
        this.invalidCustomer=true;
        this.errorList.push("Please provide the customer type");
        return;
      }
      else if(details.VehicleRegistration===null || details.VehicleRegistration===undefined || details.VehicleRegistration==="" || details.VehicleRegistration===" "){
        this.SpinnerService.hide();
        this.invalidCustomer=true;
        this.errorList.push("Please provide the vehicle registration");
        return;
      }
      else if(details.Make===null || details.Make===undefined || details.Make==="" || details.Make===" "){
        this.SpinnerService.hide();
        this.invalidCustomer=true;
        this.errorList.push("Please provide the Make");
        return;
      }

      /*if(this.IsRightUser && (details.Branch===undefined || details.Branch==="" || details.Branch===" "))
      {
        this.invalidCustomer=true;
        this.errorList.push("Please provide the branch");
        return;
      }*/
      this.customerService.addCustomer(details.Name,details.CustomerType,details.VehicleRegistration,
        details.Make,details.Description,details.Contact,details.Branch).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/customers"]);
          this.successMessage = result.message;
          this.invalidCustomer = false;
          this.isSuccessful = true;

          this.insertForm.controls['CustomerType'].disable();
          this.insertForm.controls['VehicleRegistration'].disable();
          this.insertForm.controls['Make'].disable();
          this.insertForm.controls['Description'].disable();
          this.insertForm.controls['Contact'].disable();

        }
        else {
          this.errorList.push(result.message);
          this.invalidCustomer = true;
          this.isSuccessful = false;

          this.insertForm.controls['CustomerType'].enable();
          this.insertForm.controls['VehicleRegistration'].enable();
          this.insertForm.controls['Make'].enable();
          this.insertForm.controls['Description'].enable();
          this.insertForm.controls['Contact'].enable();

        }
        return;


      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          this.errorList.push(error);
          this.invalidCustomer = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidCustomer = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }





}
