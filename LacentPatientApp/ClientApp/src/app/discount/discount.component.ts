import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { PricingdetailService } from '../pricingdetail.service';
import { WashtypeService } from '../washtype.service';
import { VehicletypeService } from '../vehicletype.service';
import { DiscountService } from '../discount.service';
import { Router } from '@angular/router';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { WashTypeModel } from '../_models/WashTypeModel';
import { VehicleTypeModel } from '../_models/VehicleTypeModel';
import { BranchService } from '../branch.service';
import { BranchModel } from '../_models/BranchModel';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatUIService } from '../activat-ui.service';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  public title = 'Discount';

  searchTerm : FormControl = new FormControl();
  public customerList  = <any>[];
  vehicleTypes = <any>[];
  customerTypes = <any>[];
  branches=<any>[];
  washTypes = <any>[];
  paymentTypes = <any>[];
  WashType: FormControl;
  VehicleType: FormControl;
  CustomerType:FormControl;
  Branch:FormControl;
  check:any;

  Day:FormControl;
  Description:FormControl;
  OnWhichDate:FormControl;
  ToWhichDate:FormControl;
  Percentage:FormControl;

  public errorList;
  public typeList:CustomerTypeModel[];
  public washTypeList:WashTypeModel[];
  public vehicleTypeList:VehicleTypeModel[];
  public branchList:BranchModel[];

  //typeList = [];
  successMessage;
  invalidDiscount = false;
  isSuccessful = false;
  selectedOption:FormControl;
  selectedCustomer :any;
  closeResult: string;
  Amount:FormControl;
  customer:string ='';

  selectedWashTypeOption:any;
  selectedVehicleTypeOption:any;
  selectedPaymentTypeOption:any;
  selectedDayOption:any;

  constructor(private router: Router,private discountService : DiscountService,private modalService: NgbModal,private orderService : OrderService,
    private paymentTypeService:PaymentmethodService,private pricingDetailService: PricingdetailService,
    private SpinnerService: NgxSpinnerService,
    private washtypeService: WashtypeService,private vehicletypeService: VehicletypeService,private customerService: CustomerService,
     private fb: FormBuilder,private branchService:BranchService,private activateUIService:ActivatUIService) {

      this.branchService.getBranches().subscribe(

        data => {
          debugger;
          this.branches = data as any[];
          console.log(this.branches);
        },
        error => {
          console.log("Error:Problem getting the branches " + error);

      });
    this.washtypeService.getWashTypes().subscribe(

      data => {
        debugger;
        this.washTypes = data as any[];
        console.log(this.washTypes);
      },
      error => {
        console.log("Error:Problem getting the wash types " + error);

    });

    this.vehicletypeService.getVehicleTypes().subscribe(
      data => {
        debugger;
        this.vehicleTypes = data as any[];
        console.log(this.vehicleTypes);
      },
      error => {
        console.log("Error:Problem getting the vehicle types "+ error);

    });

    this.customerService.getCustomerTypes().subscribe(
      data => {
        debugger;
        this.customerTypes = data as any[];
        console.log(this.customerTypes);
      },
      error => {
        console.log("Error:Problem getting the customer types "+ error);

    });

  }
  insertForm: FormGroup;

  ngOnInit () {

    try{

      this.activateUIService.initToggle();
      this.VehicleType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.WashType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.CustomerType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

      this.Description = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.Percentage = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.Branch = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.Branch=new FormControl();
      this.insertForm = this.fb.group({
        "VehicleType": this.VehicleType,
        "WashType": this.WashType,
        "CustomerType":this.CustomerType,
        "Description":this.Description,
        "Percentage":this.Percentage,
        "ToWhichDate":this.ToWhichDate,
        "Day":this.Day,
        "OnWhichDate":this.OnWhichDate,

      });

      this.errorList=[];
      this.typeList=new Array<CustomerTypeModel>();
      this.washTypeList=new Array<WashTypeModel>();
      this.vehicleTypeList=new Array<VehicleTypeModel>();
      this.branchList=new Array<BranchModel>();
    }
    catch(e){
      this.errorList.push(e.Message);
    }

  }

  GetCutomerType(event){

    console.log(event.target.value);
    var found = false;
    for(var i = 0; i < this.typeList.length; i++) {
      if (this.typeList[i].name === event.target.value) {
        found = true;
        break;
      }
    }

    if(!found)
    {
      let obj=new CustomerTypeModel();
      obj.name=event.target.value;
      this.typeList.push(obj);
    }

  }

  GetWashType(event){

    console.log(event.target.value);
    var found = false;
    for(var i = 0; i < this.washTypeList.length; i++) {
      if (this.washTypeList[i].name === event.target.value) {
        found = true;
        break;
      }
    }

    if(!found)
    {
      let obj=new WashTypeModel();
      obj.name=event.target.value;
      this.washTypeList.push(obj);
    }

  }

  GetVehicleType(event){

    console.log(event.target.value);

    var found = false;
    for(var i = 0; i < this.vehicleTypeList.length; i++) {
      if (this.vehicleTypeList[i].name === event.target.value) {
        found = true;
        break;
      }
    }

    if(!found)
    {
      let obj=new VehicleTypeModel();
      obj.name=event.target.value;
      this.vehicleTypeList.push(obj);
    }

  }
  onSave(){
    try {
      debugger;
      this.invalidDiscount=false;
      this.errorList=[];
      this.SpinnerService.show();
      let details = this.insertForm.value;
      if(this.typeList.length===0)
      {
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide the customer type(s)");
        return;
      }
      else if(this.washTypeList.length===0)
      {
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide the wash type(s)");
        return;
      }
      else if(this.vehicleTypeList.length===0){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide the vehicle type(s)");
        return;
      }
      else if(details.Description===null || details.Description===undefined || details.Description==='' || details.Description===' '){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide the description");
        return;
      }
      else if(details.Percentage===null || details.Percentage===undefined || details.Percentage==='' || details.Percentage===' ' || details.Percentage<=0){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide the percentage,value should be more that zero");
        return;
      }
      else if(details.Percentage>100){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("The percentage should not be more than 100%");
        return;
      }
      else if(details.OnWhichDate===null && details.ToWhichDate===null){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide on which date");
        return;
      }
      else if(details.OnWhichDate==="" && details.ToWhichDate===""){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide on which date");
        return;
      }
      else if(details.Day===undefined && details.OnWhichDate===null && details.ToWhichDate===null){
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide on which date");
        return;
      }
      else if(details.OnWhichDate!==null && details.OnWhichDate!=='' && details.OnWhichDate!==' ' && (details.ToWhichDate===null || details.ToWhichDate==='' || details.ToWhichDate===' ' ))
      {
        this.SpinnerService.hide();
        this.invalidDiscount=true;
        this.errorList.push("Please provide from which date to which date");
        return;
      }
      this.discountService.createDiscount(details.Description,details.Percentage,this.washTypeList,this.vehicleTypeList,
        this.typeList,details.Day,details.OnWhichDate,details.ToWhichDate).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/discounts"]);
          this.successMessage = result.message;
          this.invalidDiscount = false;
          this.isSuccessful = true;
          this.insertForm.controls['VehicleType'].disable();
          this.insertForm.controls['WashType'].disable();
          this.insertForm.controls['CustomerType'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidDiscount = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['CustomerType'].enable();
        }
        return;
      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          this.errorList.push(error);
          this.invalidDiscount = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['CustomerType'].enable();
        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidDiscount = true;
      this.isSuccessful = false;
      this.insertForm.controls['VehicleType'].enable();
      this.insertForm.controls['WashType'].enable();
      this.insertForm.controls['CustomerType'].enable();
    }
    return;

  }


}
