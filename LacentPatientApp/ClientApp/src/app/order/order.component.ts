import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NullTemplateVisitor } from '@angular/compiler';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { PricingdetailService } from '../pricingdetail.service';
import { VehicletypeService } from '../vehicletype.service';
import { WashtypeService } from '../washtype.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { OrderService } from '../order.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatUIService } from '../activat-ui.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [CustomerService]
})

export class OrderComponent implements OnInit  {

  public title = 'Vehicle Arrival';

  searchTerm : FormControl = new FormControl();
  public customerList  = <any>[];
  vehicleTypes = <any>[];
  washTypes = <any>[];
  paymentTypes = <any>[];
  WashType: FormControl;
  VehicleType: FormControl;
  PaymentMethod:FormControl;

  errorList: string[];
  ErrorMessage:string;
  successMessage;
  invalidOrder = false;
  isSuccessful = false;
  selectedOption:FormControl;
  selectedCustomer = '';
  closeResult: string;
  Amount:FormControl;
  OrderBy:FormControl= new FormControl();
  customer:string ='';
  percentage:number;
  giveDiscount:boolean;
  originalPrice:string;
  selectedWashTypeOption:any;
  selectedVehicleTypeOption:any;
  selectedPaymentTypeOption:any;
  Name:FormControl;
  Branch : FormControl;
  userrole:string;
  IsRightUser:boolean;
  roles:any;
  branches = <any>[];
  selectedBranchOption: string;
  insertForm: FormGroup;
  Userrole$: Observable<string>;
  constructor(private router: Router,private modalService: NgbModal,private orderService : OrderService,
    private paymentTypeService:PaymentmethodService,private pricingDetailService: PricingdetailService,
    private washtypeService: WashtypeService,private vehicletypeService: VehicletypeService,
    private register: RegisterService,private SpinnerService: NgxSpinnerService,private activateUIService:ActivatUIService,
    private customerService: CustomerService, private fb: FormBuilder,private branchService:BranchService)
    {
      this.branchService.getBranches().subscribe(
        data => {
          this.branches = data as any[];
          console.log(this.branches);
        },
        error => {
          console.log("Error:Problem getting the branches "+ error);
      });
    this.giveDiscount=false;
    this.percentage=0;
    this.originalPrice="";
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

    this.paymentTypeService.getPaymentMethods().subscribe(
      data => {
        this.paymentTypes = data as any[];
        console.log(this.paymentTypes);
      },
      error => {
        console.log("Error:Problem getting the payment types "+ error);

    });

  }

  ngOnInit () {

    try{
      this.Userrole$ = this.register.currentUserRole;
    this.Userrole$.subscribe(data=>{
        console.log('am i logged in as ', data);
        if(data==='Manager')
        {
          this.IsRightUser=true;
        }
        this.userrole=data;
    });

    this.register.getUserrole().subscribe(

      data => {
        this.roles = data as any;

        console.log(this.roles);
        if(this.roles.length>0 && this.roles[0]==='Manager')
        {
          this.IsRightUser=true;
          this.userrole=this.roles[0];
        }
        else{
          this.IsRightUser=false;
          this.userrole=this.roles[0];
        }

      },
      error => {
        console.log('Error:Problem getting the user role ' + error);

    });
    this.activateUIService.initToggle();
      this.errorList=[];
      this.VehicleType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.WashType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.PaymentMethod = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.Branch = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.searchTerm.valueChanges.subscribe(
        term => {
          if (term !== '') {

            this.customerService.search(term).subscribe(
              data => {
                debugger;
                this.customerList = data as any[];
                //console.log(data[0].BookName);
            });
          }
      });
      this.insertForm = this.fb.group({
        "VehicleType": this.VehicleType,
        "WashType": this.WashType,
        "PaymentMethod":this.PaymentMethod,
        "VehicleRegistration":this.searchTerm.value,
        "Amount":this.Amount,
        "OrderBy":this.OrderBy,
        "Branch": this.Branch,
      });
    }
    catch(e){
      this.errorList.push(e.Message);
    }
  }

  onSave(){
    try {
      this.invalidOrder=false;
      this.errorList=[];
      this.SpinnerService.show();
      if(this.searchTerm.value ==='')
      {
        this.errorList.push("Please search for the vehicle registration");
          this.invalidOrder = true;
          this.SpinnerService.hide();
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['PaymentType'].enable();
        return;
      }

      this.insertForm.get('VehicleRegistration').setValue(this.searchTerm.value);
      let details = this.insertForm.value;
      if(this.searchTerm.value===null || this.searchTerm.value===undefined || this.searchTerm.value==="" || this.searchTerm.value===" ")
      {
        this.SpinnerService.hide();
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle registration");
        return;
      }
      if(details.WashType==="Please Select" || details.WashType===undefined || details.WashType==="" || details.WashType===" ")
      {
        this.SpinnerService.hide();
        this.invalidOrder=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      else if(details.VehicleType==="Please Select" || details.VehicleType===undefined || details.VehicleType==="" || details.VehicleType===" "){
        this.SpinnerService.hide();
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle type");
        return;
      }
      else if(details.PaymentMethod==="Please Select"  || details.PaymentMethod===undefined || details.PaymentMethod==="" || details.PaymentMethod===" "){
        this.SpinnerService.hide();
        this.invalidOrder=true;
        this.errorList.push("Please provide the payment method");
        return;
      }
      if(this.IsRightUser && (details.Branch==="Please Select" || details.Branch===undefined || details.Branch==="" || details.Branch===" "))
      {
        this.SpinnerService.hide();
        this.invalidOrder=true;
        this.errorList.push("Please provide the branch");
        return;
      }
      this.orderService.createOrder(details.OrderBy,details.VehicleRegistration,details.VehicleType,details.WashType,
        details.PaymentMethod,details.Branch).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {

          this.router.navigate(["/orders"]);
          this.modalService.dismissAll();
          this.successMessage = result.message;
          this.invalidOrder = false;
          this.isSuccessful = true;
          this.insertForm.controls['VehicleType'].disable();
          this.insertForm.controls['WashType'].disable();
          this.insertForm.controls['PaymentType'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidOrder = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['PaymentType'].enable();
        }
        return;
      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          this.errorList.push(error);
          this.invalidOrder = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['PaymentType'].enable();
        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidOrder = true;
      this.isSuccessful = false;
      this.insertForm.controls['VehicleType'].enable();
      this.insertForm.controls['WashType'].enable();
      this.insertForm.controls['PaymentType'].enable();
    }
    return;
  }

  open(content){

    try{
      debugger;
      this.invalidOrder=false;
      this.errorList=[];
      let details = this.insertForm.value;
      if(this.searchTerm.value===' ' || this.searchTerm.value==='' || this.searchTerm.value===undefined)
      {
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle registration");
        return;
      }
      if(details.WashType==="Please Select" || details.WashType===undefined || details.WashType==='' || details.WashType===' ')
      {
        this.invalidOrder=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      else if(details.VehicleType==="Please Select" || details.VehicleType===undefined || details.VehicleType==='' || details.VehicleType===' '){
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle type");
        return;
      }
      else if(details.PaymentMethod==="Please Select" || details.PaymentMethod===undefined || details.PaymentMethod==='' || details.PaymentMethod===""){
        this.invalidOrder=true;
        this.errorList.push("Please provide the payment method");
        return;
      }
      if(this.IsRightUser && (details.Branch==="Please Select" || details.Branch===undefined || details.Branch==="" || details.Branch===" "))
      {
        this.SpinnerService.hide();
        this.invalidOrder=true;
        this.errorList.push("Please provide the branch");
        return;
      }
      this.insertForm.get('VehicleRegistration').setValue(this.searchTerm.value);

      this.pricingDetailService.getAmount(details.VehicleType , details.WashType,this.searchTerm.value).subscribe(

        data => {

          let amount = data as any;

          let isString=typeof amount;

          if(amount.message!==undefined)
          {
            console.log(amount.message);
            this.invalidOrder=true;
            this.errorList.push(amount.message);
            return;
          }

          if(amount !== null)
          {
            this.invalidOrder=false;
            var value=parseFloat(amount.orderAmount).toFixed(2);
            this.insertForm.get('Amount').setValue(value);
            this.giveDiscount=amount.giveDiscount;
            this.percentage=amount.percentage;
            var price=amount.originalPrice+"";
            this.originalPrice=parseFloat(price).toFixed(2);

                this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                  this.closeResult = `Closed with: ${result}`;

                }, (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });

            console.log(this.insertForm.get('Amount'));
          }
          else{
            //this.Amount=0;
            console.log("Error:Problem getting amount ");
            console.log(amount.message);
            this.invalidOrder=true;
            this.errorList.push("Error:Please try again");
            return;
          }
        },
        error => {
          this.invalidOrder=true;
          console.log("Error:Problem getting amount " + error);
        }
      );




    }
    catch(e){

    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getCustomerDetails(fullName,contact){

    try{

      if(fullName!==null && fullName!==undefined)
        this.OrderBy.setValue(fullName);
      else
        this.OrderBy.setValue("");
    }catch(e){
      console.log(e)
    }

  }



}
