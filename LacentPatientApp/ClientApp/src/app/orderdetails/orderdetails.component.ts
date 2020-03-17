import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../_models/OrderModel';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { OrderService } from '../order.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  Order: OrderModel;
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

  invalidOrder:boolean=false;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private orderService: OrderService,private activateUIService:ActivatUIService,
      private router: Router, private fb: FormBuilder) {

    this.Order = new OrderModel();
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

   this.orderService.getOrderDetails(this.id).subscribe(

    data => {

      this.Order = data as any;
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR',
      });
      let a=parseFloat(this.Order.amount);
      const amount=formatter.format(a);
      console.log(amount);
      this.Order.amount=amount;
      console.log(this.Order);
    },
    error => {
      console.log('Error:Problem getting the customer types ' + error);
  });

  }
}
