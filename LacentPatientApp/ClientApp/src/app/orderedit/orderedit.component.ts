import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerModel } from '../_models/CustomerModel';
import { OrderModel } from '../_models/OrderModel';
import { VehicletypeService } from '../vehicletype.service';
import { WashtypeService } from '../washtype.service';
import { OrderService } from '../order.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PricingdetailService } from '../pricingdetail.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-orderedit',
  templateUrl: './orderedit.component.html',
  styleUrls: ['./orderedit.component.css']
})
export class OrdereditComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes=<any>[];

  PaymentMethod: FormControl=new FormControl();
  VehicleRegistration: FormControl=new FormControl();
  VehicleType: FormControl=new FormControl();
  Amount: FormControl=new FormControl();
  WashType: FormControl=new FormControl();

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidOrder = false;
  isSuccessful = false;
  selectedOption:FormControl=new FormControl();
  id: number;
  private sub: any;
  Order:OrderModel;
  vehicleTypes = <any>[];
  washTypes = <any>[];
  paymentTypes=<any>[];
  searchTerm : FormControl = new FormControl();
  public customerList  = <any>[];
  closeResult: string;

  selectedWashTypeOption:any;
  selectedVehicleTypeOption:any;
  selectedPaymentTypeOption:any;
  selectedDayOption:any;
  selectedCustomer:any;

  originalPrice:number;

  giveDiscount:boolean;
  percentage:number;
  OrderBy:FormControl;
  //giveDiscount:boolean;

  constructor(private paymentTypeService:PaymentmethodService,
    private pricingDetailService: PricingdetailService,private modalService: NgbModal,
    private washtypeService: WashtypeService,private vehicletypeService: VehicletypeService,
    private activateUIService:ActivatUIService
    ,private orderService:OrderService,private activeRoute: ActivatedRoute,private register: RegisterService,
    private customerService:CustomerService,private router: Router, private fb: FormBuilder) {

    this.Order = new OrderModel();

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
    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });


    //this.customerTypes = this.customerService.getCustomerTypes();

    this.errorList = [];
    this.originalPrice=0;

    this.VehicleType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.WashType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.PaymentMethod = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {

          this.customerService.search(term).subscribe(
            data => {
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
      "OrderId":this.id,
      "OrderBy":this.OrderBy
    });

    this.orderService.getOrderDetails(this.id).subscribe(

      data => {

        this.Order = data as any;
        this.WashType.setValue(this.Order.washType);
        this.VehicleRegistration.setValue(this.Order.vehicleRegistration);
        this.searchTerm.setValue(this.Order.vehicleRegistration);
        this.VehicleType.setValue(this.Order.vehicleType);
        this.Amount.setValue(this.Order.amount);
        this.PaymentMethod.setValue(this.Order.paymentMethod);

        this.OrderBy.setValue(this.Order.orderBelongsTo);
        console.log(this.Order);
      },
      error => {
        console.log('Error:Problem getting the customer types ' + error);

    });

  }

  onSave(){


    try {

      if(this.id<=0)
      {

        this.errorList.push("try again");
        return;
      }

      const details = this.insertForm.value;

      details.VehicleRegistration=this.searchTerm.value;

      if(this.searchTerm.value ==='' || this.searchTerm.value ===undefined)
      {
        this.errorList.push("Please search for the vehicle registration");
          this.invalidOrder = true;
          this.isSuccessful = false;
          this.insertForm.controls['VehicleType'].enable();
          this.insertForm.controls['WashType'].enable();
          this.insertForm.controls['PaymentType'].enable();
        return;
      }
      else if(details.WashType===undefined)
      {
        this.invalidOrder=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      else if(details.VehicleType===undefined){
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle type");
        return;
      }
      else if(details.PaymentMethod===undefined){
        this.invalidOrder=true;
        this.errorList.push("Please provide the payment method");
        return;
      }

      this.orderService.updateOrer(details.OrderBy,details.OrderId,details.VehicleRegistration,details.VehicleType,details.WashType,details.PaymentMethod).subscribe(result => {

        if (result.message === "Successful") {

          this.modalService.dismissAll();
          this.router.navigate(["/orders"]);

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

      const details = this.insertForm.value;

      if(this.searchTerm.value===null || this.searchTerm.value===undefined)
      {
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle registration");
        return;
      }
      if(details.WashType===undefined)
      {
        this.invalidOrder=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      else if(details.VehicleType===undefined){
        this.invalidOrder=true;
        this.errorList.push("Please provide the vehicle type");
        return;
      }


      details.VehicleRegistration= this.searchTerm.value;

      this.pricingDetailService.getAmount(details.VehicleType , details.WashType,details.VehicleRegistration).subscribe(

        data => {

          const amount = data as any;

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
            this.insertForm.get('Amount').setValue(amount.orderAmount);
            this.giveDiscount=amount.giveDiscount;
            this.percentage=amount.percentage;
            this.originalPrice=amount.originalPrice;

                this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                  this.closeResult = `Closed with: ${result}`;

                }, (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });

            console.log(this.insertForm.get('Amount'));
          }
          else{
            console.log("Error:Problem getting amount ");
            console.log(amount.message);
            this.invalidOrder=true;
            this.errorList.push("Error:Please try again");
            return;
          }
        },
        error => {
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



}
