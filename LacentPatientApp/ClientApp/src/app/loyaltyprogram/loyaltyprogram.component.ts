import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { PricingdetailService } from '../pricingdetail.service';
import { WashtypeService } from '../washtype.service';
import { VehicletypeService } from '../vehicletype.service';
import { DiscountService } from '../discount.service';
import { Router } from '@angular/router';
import { LoyaltyprogramService } from '../loyaltyprogram.service';
import { LoyaltyProgramModel } from '../_models/LoyaltyProgramModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-loyaltyprogram',
  templateUrl: './loyaltyprogram.component.html',
  styleUrls: ['./loyaltyprogram.component.css']
})
export class LoyaltyprogramComponent implements OnInit {

  public title = 'Loyalty Program';

  NoOfWashes:FormControl;
  Percentage:FormControl;

  errorList: string[];
  successMessage;
  invalidLoyaltyProgram = false;
  isSuccessful = false;
  selectedOption:FormControl;
  selectedCustomer = '';
  closeResult: string;
  insertForm: FormGroup;
  LoyaltyProgram:LoyaltyProgramModel;
  constructor(private loyaltyService:LoyaltyprogramService,private router: Router,
    private discountService : DiscountService,private modalService: NgbModal,
    private orderService : OrderService,private paymentTypeService:PaymentmethodService,
    private pricingDetailService: PricingdetailService,private washtypeService: WashtypeService,
    private activateUIService:ActivatUIService,
    private vehicletypeService: VehicletypeService,private customerService: CustomerService,
     private fb: FormBuilder) {
    this.LoyaltyProgram=new LoyaltyProgramModel();
  }


  ngOnInit () {

    try{
      this.activateUIService.initToggle();
      this.NoOfWashes = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
      this.Percentage = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);

      this.insertForm = this.fb.group({

        "Percentage":this.Percentage,
        "NoOfWashes":this.NoOfWashes,

      });

      this.loyaltyService.getDetails().subscribe(

        data => {

          this.LoyaltyProgram = data as any;
          this.NoOfWashes.setValue(this.LoyaltyProgram.noOfWashes);
          this.Percentage.setValue(this.LoyaltyProgram.percentage);

          console.log(this.LoyaltyProgram);
        },
        error => {
          console.log('Error:Problem getting the loyalty program details ' + error);

        });
    }
    catch(e){
      this.errorList.push(e.Message);
    }

  }


  onSave(){


    try {
      this.invalidLoyaltyProgram=false;
      this.errorList=[];
      let details = this.insertForm.value;
      debugger;
      if(details.Percentage<0 || details.Percentage>100){
        this.invalidLoyaltyProgram=true;
        this.errorList.push("The percentage should not be more than 100% Or less than zero");
        return;
      }
      else if(details.NoOfWashes<0){

        this.invalidLoyaltyProgram=true;
        this.errorList.push("No Of Washes cannot be negative");
        return;
      }
      this.loyaltyService.saveDetails(details.Percentage,details.NoOfWashes).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/loyaltyprogramdetails"]);
          this.successMessage = result.message;
          this.invalidLoyaltyProgram = false;
          this.isSuccessful = true;
          this.insertForm.controls['Percentage'].disable();
          this.insertForm.controls['NoOfWashes'].disable();

        }
        else {
          this.errorList.push(result.message);
          this.invalidLoyaltyProgram = true;
          this.isSuccessful = false;
          this.insertForm.controls['Percentage'].disable();
          this.insertForm.controls['NoOfWashes'].disable();

        }
        return;

      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidLoyaltyProgram = true;
          this.isSuccessful = false;
          this.insertForm.controls['Percentage'].disable();
          this.insertForm.controls['NoOfWashes'].disable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidLoyaltyProgram = true;
      this.isSuccessful = false;
      this.insertForm.controls['Percentage'].disable();
          this.insertForm.controls['NoOfWashes'].disable();
    }
    return;

  }



}
