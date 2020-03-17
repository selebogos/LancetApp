import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { PaymentmethodService } from '../paymentmethod.service';
import { WashtypeService } from '../washtype.service';
import { VehicletypeService } from '../vehicletype.service';
import { PricingdetailService } from '../pricingdetail.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-pricingdetails',
  templateUrl: './pricingdetails.component.html',
  styleUrls: ['./pricingdetails.component.css']
})
export class PricingdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Amount: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidPricingDetails = false;
  isSuccessful = false;
  vehicleTypes = <any>[];
  washTypes = <any>[];
  WashType: FormControl;
  VehicleType: FormControl;
  Description: FormControl;
  selectedCustomer:string;

  selectedWashTypeOption:any;
  selectedVehicleTypeOption:any;
  selectedPaymentTypeOption:any;

  constructor(private pricingDetailService: PricingdetailService,private washtypeService: WashtypeService,
    private vehicletypeService: VehicletypeService, private register: RegisterService,
    private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {


    this.washtypeService.getWashTypes().subscribe(

      data => {
        this.washTypes = data as any[];
        console.log(this.washTypes);
      },
      error => {
        console.log("Error:Problem getting the wash types " + error);

    });

    this.vehicletypeService.getVehicleTypes().subscribe(
      data => {
        this.vehicleTypes = data as any[];
        console.log(this.vehicleTypes);
      },
      error => {
        console.log("Error:Problem getting the vehicle types "+ error);

    });


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
    //this.vehicleTypes = this.vehicletypeService.getVehicleTypes();
    //this.washTypes = this.washtypeService.getWashTypes();

    this.errorList = [];
    this.Amount = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.VehicleType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.WashType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.Description = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.insertForm = this.fb.group({

      "Amount": this.Amount,
      "VehicleType": this.VehicleType,
      "WashType": this.WashType,
      "Description":this.Description

    });

  }

  onSave() {

    try {
      this.errorList=[];
      this.invalidPricingDetails=false;
      let details = this.insertForm.value;
      if(details.VehicleType==="Please Select" || details.VehicleType===undefined || details.VehicleType==="" || details.VehicleType===" ")
      {
        this.invalidPricingDetails=true;
        this.errorList.push("Please provide the vehicle type");
        return;
      }
      else if(details.WashType==="Please Select" || details.WashType===undefined || details.WashType==="" || details.WashType===" ")
      {
        this.invalidPricingDetails=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      else if(details.Amount<=0 || details.Amount===undefined || details.Amount==="" || details.Amount===" ")
      {
        this.invalidPricingDetails=true;
        this.errorList.push("Please provide the amount");
        return;
      }

      this.pricingDetailService.addPricingDetails(details.Description,details.VehicleType,details.WashType,details.Amount).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/pricingdetails"]);
          this.successMessage = result.message;
          this.invalidPricingDetails = false;
          this.isSuccessful = true;
          this.insertForm.controls['VehicleType'].disable();
          this.insertForm.controls['WashType'].disable();
          this.insertForm.controls['Amount'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidPricingDetails = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['Amount'].enable();
        }
        return;


      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidPricingDetails = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['Amount'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidPricingDetails = true;
      this.isSuccessful = false;
      this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['Amount'].enable();
    }
    return;

  }

}
