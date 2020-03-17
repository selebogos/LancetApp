import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PosService } from '../pos.service';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { POSModel } from '../_models/PosModel';
import { OrderService } from '../order.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-cashupdetails',
  templateUrl: './cashupdetails.component.html',
  styleUrls: ['./cashupdetails.component.css']
})
export class CashupdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  POS: POSModel;
  CustomerType: FormControl;
  VehicleRegistration: FormControl;
  Make: FormControl;
  Description: FormControl;
  Contact: FormControl;

  totalAmount:number;
  cardPayments:number;

  Amount1: FormControl;
  Amount2: FormControl;
  Amount3: FormControl;
  Amount4: FormControl;
  Amount5: FormControl;
  Amount6: FormControl;
  Amount7: FormControl;
  Amount8: FormControl;
  Note: FormControl;

  errorList: string[];
  successMessage;
  invalidTill = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private orderService: OrderService, private router: Router,
      private fb: FormBuilder,private posService: PosService,private activateUIService:ActivatUIService) {

    this.POS = new POSModel();
    this.posService.getTillAmount().subscribe(

      data => {
        this.totalAmount = data as any;
        console.log(this.totalAmount);
        this.Amount1.setValue(this.totalAmount);
      },
      error => {
        console.log("Error:Problem getting the till amount from yesterday " + error);
    });

    this.posService.getNoOfCardPayments().subscribe(

      data => {
        this.cardPayments = data as any;
        console.log(this.cardPayments);
        this.Amount2.setValue(this.cardPayments);
      },
      error => {
        console.log("Error:Problem getting the no. of card payments" + error);
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

   this.posService.getCashupDetails(this.id).subscribe(

    data => {

      this.POS = data as any;

      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR',
      });
      //let a=parseFloat(this.POS.amount1.toString());
      const a1=parseFloat(this.POS.amount1.toString());
      this.POS.amount1=formatter.format(a1);

      const a2=parseFloat(this.POS.amount2.toString());
      this.POS.amount2=formatter.format(parseFloat(this.POS.amount2.toString()));

      const a3=parseFloat(this.POS.amount3.toString());
      this.POS.amount3=formatter.format(a3);

      const a4=parseFloat(this.POS.amount4.toString());
      this.POS.amount4=formatter.format(a4);

      const a5=parseFloat(this.POS.amount5.toString());
      this.POS.amount5=formatter.format(a5);

      const a6=parseFloat(this.POS.amount6.toString());
      this.POS.amount6=formatter.format(a6);

      const a7=parseFloat(this.POS.amount7.toString());
      this.POS.amount7=formatter.format(a7);

      const a8=parseFloat(this.POS.amount8.toString());
      this.POS.amount8=formatter.format(a8);



      console.log(this.POS);
    },
    error => {
      console.log('Error:Problem getting the customer types ' + error);

  });

  }

}
