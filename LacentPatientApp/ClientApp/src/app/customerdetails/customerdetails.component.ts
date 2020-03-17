import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerModel } from '../_models/CustomerModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  Customer: CustomerModel;
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
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private customerService: CustomerService, private router: Router,
      private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.Customer = new CustomerModel();
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

    this.customerService.getCustomerDetails(this.id).subscribe(

      data => {
        this.Customer = data as any;
        console.log(this.Customer);
      },
      error => {
        console.log('Error:Problem getting the customer types ' + error);

    });

  }




}




