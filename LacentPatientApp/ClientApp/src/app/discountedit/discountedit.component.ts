import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PricingdetailService } from '../pricingdetail.service';
import { DiscountService } from '../discount.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { WashtypeService } from '../washtype.service';
import { VehicletypeService } from '../vehicletype.service';
import { CustomerService } from '../customer.service';
import { DiscountModel } from '../_models/DiscountModel';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { VehicleTypeModel } from '../_models/VehicleTypeModel';
import { WashTypeModel } from '../_models/WashTypeModel';
import { BranchModel } from '../_models/BranchModel';
import { BranchService } from '../branch.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatUIService } from '../activat-ui.service';
@Component({
  selector: 'app-discountedit',
  templateUrl: './discountedit.component.html',
  styleUrls: ['./discountedit.component.css']
})
export class DiscounteditComponent implements OnInit {

  public title = 'Discount';
  searchTerm : FormControl = new FormControl();
  public customerList  = <any>[];
  vehicleTypes = <any>[];
  washTypes = <any>[];
  cTypes=<any>[];
  paymentTypes = <any>[];
  DiscountList: DiscountModel[];
  WashType: FormControl;
  VehicleType: FormControl;
  CustomerType:FormControl;
  Day:FormControl;
  Description:FormControl;
  OnWhichDate:FormControl;
  ToWhichDate:FormControl;
  Percentage:FormControl;
  selectedWashTypeOption:string;
  selectedVehicleTypeOption:string;
  selectedDayOption:string;
  isDisabled:boolean;
  public errorList;
  public customerTypeList:CustomerTypeModel[];
  public washTypeList:WashTypeModel[];
  public vehicleTypeList:VehicleTypeModel[];
  public branchList:BranchModel[];
  //typeList = [];
  successMessage;
  invalidDiscount = false;
  isSuccessful = false;
  selectedOption:FormControl;
  selectedCustomer = '';
  closeResult: string;
  Amount:FormControl;
  customer:string ='';
  Discount: DiscountModel;
  id: number;
  private sub: any;
  check:any;
  controls:any;
  customerTypeItems=[];
  vehicleTypeItems=[];
  washTypeItems=[];
  formControls=<any>[];

  constructor(private activeRoute: ActivatedRoute,private router: Router,private discountService : DiscountService,
    private SpinnerService: NgxSpinnerService,private activateUIService:ActivatUIService,
    private modalService: NgbModal,private orderService : OrderService,
    private paymentTypeService:PaymentmethodService,private pricingDetailService: PricingdetailService,
    private washtypeService: WashtypeService,private vehicletypeService: VehicletypeService,
    private customerService: CustomerService, private fb: FormBuilder,private branchService:BranchService) {

      this.Discount = new DiscountModel();
      this.errorList=[];
      this.customerTypeList=new Array<CustomerTypeModel>();
      this.washTypeList=new Array<WashTypeModel>();
      this.vehicleTypeList=new Array<VehicleTypeModel>();
      this.branchList=new Array<BranchModel>();
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
      this.insertForm = this.fb.group({
        "DiscountId":this.id,
        "VehicleType": this.VehicleType,
        "WashType": this.WashType,
        "customerTypeItems": new FormArray([]),
        "Description":this.Description,
        "Percentage":this.Percentage,
        "ToWhichDate":this.ToWhichDate,
        "Day":this.Day,
        "OnWhichDate":this.OnWhichDate,

      });
      this.sub = this.activeRoute.params.subscribe(params => {
        this.id = +params.id; // (+) converts string 'id' to a number
        // In a real app: dispatch action to load the details here.
     });
     this.discountService.getDiscountDetails(this.id).subscribe(
      data => {
        this.Discount = data as any;
      this.customerTypeList=this.Discount.customerTypes;
      this.washTypeList=this.Discount.washTypes;
      this.vehicleTypeList=this.Discount.vehicleTypes;
      this.branchList=this.Discount.branches;

      if(this.Discount.disabled)
        this.isDisabled=false;
      else
        this.isDisabled=true;

      console.log(this.Discount);
        var onWhich="";
        var toWhich="";

        if(this.Discount.onWhichDate!==null)
        {
          onWhich=this.Discount.onWhichDate.toString();
          onWhich=onWhich.slice(0,10);
        }
        if(this.Discount.toWhichDate!==null)
        {
          toWhich=this.Discount.toWhichDate.toString();
          toWhich=toWhich.slice(0,10);
        }
        if(this.Discount.day!==null)
        {
          this.insertForm.get('Day').setValue(this.Discount.day.toString());
        }

        this.insertForm.get('OnWhichDate').setValue(onWhich);
        this.insertForm.get('ToWhichDate').setValue(toWhich);
        this.insertForm.get('WashType').setValue(this.Discount.washType);
        this.insertForm.get('VehicleType').setValue(this.Discount.vehicleType);
        this.insertForm.get('Description').setValue(this.Discount.description);
        this.insertForm.get('Percentage').setValue(this.Discount.percentage);

      },
      error => {
        console.log('Error:Problem getting the discount details ' + error);

    });

    }
    catch(e){
      this.errorList.push(e.Message);
    }

  }

  GetCustomerType(event){

    console.log(event.target.value);

    for(var i = 0; i < this.customerTypeList.length; i++) {
      if (this.customerTypeList[i].name === event.target.value) {

        break;
      }
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
  }
  disableDiscount(event: any, check:any)
  {

    this.isDisabled=event.target.checked;
    //console.log("question answer not provided responseId:: ",this.responseId, " questionId::",this.questionId, "  check::", check );
    console.log(event);
    return;
  }

  onSave(){
    try {
      this.invalidDiscount=false;
      this.errorList=[];
      this.SpinnerService.show();
      let details = this.insertForm.value;
      if(this.customerTypeList.length===0)
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

      this.discountService.updateDiscount(details.Description,details.Percentage,this.washTypeList,this.vehicleTypeList,
        this.customerTypeList,details.Day,details.OnWhichDate,details.ToWhichDate,this.isDisabled,this.id).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/discounts"]);
          this.successMessage = result.message;
          this.invalidDiscount = false;
          this.isSuccessful = true;

        }
        else {
          this.errorList.push(result.message);
          this.invalidDiscount = true;
          this.isSuccessful = false;

        }
        return;


      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          this.errorList.push(error);
          this.invalidDiscount = true;
          this.isSuccessful = false;

        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidDiscount = true;
      this.isSuccessful = false;

    }
    return;

  }


}
