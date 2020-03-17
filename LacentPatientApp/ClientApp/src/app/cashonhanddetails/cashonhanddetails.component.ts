import { Component, OnInit } from '@angular/core';
import { POSModel } from '../_models/PosModel';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { OrderService } from '../order.service';
import { PosService } from '../pos.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-cashonhanddetails',
  templateUrl: './cashonhanddetails.component.html',
  styleUrls: ['./cashonhanddetails.component.css']
})
export class CashonhanddetailsComponent implements OnInit {

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
    this.totalAmount=0;
   this.cardPayments=0;
    this.posService.getTillAmount().subscribe(

      data => {
        this.totalAmount = data as any;
        console.log(this.totalAmount);

      },
      error => {
        console.log("Error:Problem getting the till amount from yesterday " + error);
    });

    this.posService.getNoOfCardPayments().subscribe(

      data => {
        this.cardPayments = data as any;
        console.log(this.cardPayments);

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



   this.posService.getCashOnHandDetails(this.id).subscribe(

    data => {

      this.POS = data as any;

      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR',
      });
      //let a=parseFloat(this.POS.amount1.toString());
      const a1=parseFloat(this.totalAmount.toString());
      this.POS.amount1=formatter.format(a1);


      this.POS.amount2=this.POS.amount2.toString();

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
