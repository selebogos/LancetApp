import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountModel } from '../_models/DiscountModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { DiscountService } from '../discount.service';
import { CustomerService } from '../customer.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-discountdetails',
  templateUrl: './discountdetails.component.html',
  styleUrls: ['./discountdetails.component.css']
})
export class DiscountdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  washTypes =  [] as any;
  vehicleTypes =  [] as any;
  Discount: DiscountModel;
  DiscountList: DiscountModel[];
  CustomerType: FormControl;
  VehicleRegistration: FormControl;
  Make: FormControl;
  Description: FormControl;
  Contact: FormControl;
  typeList: string[];
  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidDiscount = false;
  isSuccessful = false;
  selectedOption: FormControl;
  isDisabled: boolean;
  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
    private customerService: CustomerService,private activateUIService:ActivatUIService,
    private discountService: DiscountService, private router: Router, private fb: FormBuilder) {

    this.Discount = new DiscountModel();
    this.customerService.getCustomerTypes().subscribe(
      data => {
        this.customerTypes = data as any[];
        console.log(this.customerTypes);
      },
      error => {
        console.log("Error:Problem getting the customer types "+ error);

    });
  }

  ngOnInit() {

    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.LoginStatus$.subscribe((data: boolean) => {
        console.log('am i logged in ', data);
        this.IsLoggedIn = data;
    });

    if (!this.IsLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();
    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

    this.discountService.getDiscountDetails(this.id).subscribe(

      data => {
        this.Discount = data as any;
        this.customerTypes=this.Discount.customerTypes;
        this.washTypes=this.Discount.washTypes;
        this.vehicleTypes=this.Discount.vehicleTypes;
        debugger;
        if(this.Discount.disabled)
          this.isDisabled=false;
        else
          this.isDisabled=true;

        console.log(this.Discount);
      },
      error => {
        console.log('Error:Problem getting the discount details ' + error);

    });

  }

  deleteDiscount(id:number){
    this.discountService.deleteDiscount(id).subscribe(
      data => {
        this.router.navigate(["/discounts"]);
      },
      error => {
        console.log("Error:Problem deleting a discount "+ error);

    });
  }

}
