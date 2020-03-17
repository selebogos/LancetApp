import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { PricingdetailService } from '../pricingdetail.service';
import { WashtypeService } from '../washtype.service';
import { VehicletypeService } from '../vehicletype.service';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { BranchService } from '../branch.service';
import { BusinessService } from '../business.service';
import { BookingService } from '../booking.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  public title = 'Vehicle Arrival';

  searchTerm : FormControl = new FormControl();
  public businessList  = <any>[];
  vehicleTypes = <any>[];
  washTypes = <any>[];
  paymentTypes = <any>[];
  Time: FormControl;
  Date: FormControl;
  Contact: FormControl;
  Name:FormControl;
  errorList: string[];
  ErrorMessage:string;
  successMessage;
  invalidBooking = false;
  isSuccessful = false;
  selectedOption:FormControl;
  insertForm: FormGroup;
  selectedBusiness = '';
  constructor(private router: Router,private businessService:BusinessService,private modalService: NgbModal,
     private fb: FormBuilder,private bookingService:BookingService,private SpinnerService: NgxSpinnerService)
  {}
  ngOnInit() {
    this.errorList=[];
      this.Contact = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.Date = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.Time = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
      this.searchTerm.valueChanges.subscribe(
        term => {
          if (term !== '') {
            this.businessService.search(term).subscribe(
              data => {
                this.businessList = data as any[];
            });
          }
      });

      this.insertForm = this.fb.group({
        "Name": this.Name,
        "Contact": this.Contact,
        "Time":this.Time,
        "Business":this.searchTerm.value,
        "Date":this.Date,
      });
  }

  onSubmit(){
    try {
      this.errorList=[];
      this.invalidBooking=false;
      this.SpinnerService.show();
      let details = this.insertForm.value;

      if(details.Date===undefined || details.Date==="" || details.Date===" ")
      {
        this.invalidBooking=true;
        this.SpinnerService.hide();
        this.errorList.push("Please provide the date");
        return;
      }
      else if(details.Time===undefined || details.Time==="" || details.Time===" "){
        this.SpinnerService.hide();
        this.invalidBooking=true;
        this.errorList.push("Please provide the time you will bring your vehicle(s)");
        return;
      }
      else if(details.Contact===undefined || details.Contact==="" || details.Contact===" "){
        this.SpinnerService.hide();
        this.invalidBooking=true;
        this.errorList.push("Please provide your phone number");
        return;
      }

      this.bookingService.create(this.searchTerm.value,details.Date,details.Time,details.Contact,details.Name).subscribe(result => {
        this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/bookingsuccess"]);
        }
        else {
          this.errorList.push(result.message);
          this.invalidBooking = true;
          this.isSuccessful = false;
          this.insertForm.controls['UserRole'].enable();
          this.insertForm.controls['FirstName'].enable();
          this.insertForm.controls['LastName'].enable();
          this.insertForm.controls['Password'].enable();
          this.insertForm.controls['RepeatPassword'].enable();
        }
        return;
      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          for(let i=0;i<error.error.value.length;i++){
            this.errorList.push(error.error.value[i]);
          }

          this.invalidBooking = true;
          this.isSuccessful = false;

        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidBooking = true;
      this.isSuccessful = false;

    }
    return;
  }
}
