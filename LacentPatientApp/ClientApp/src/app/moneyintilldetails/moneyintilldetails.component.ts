import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../_models/OrderModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { OrderService } from '../order.service';
import { POSModel } from '../_models/PosModel';
import { PosService } from '../pos.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-moneyintilldetails',
  templateUrl: './moneyintilldetails.component.html',
  styleUrls: ['./moneyintilldetails.component.css']
})
export class MoneyintilldetailsComponent implements OnInit {

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

  insertForm: FormGroup;

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

   this.posService.getTillDetails(this.id).subscribe(

    data => {

      this.POS = data as any;
     /*
     this.insertForm.get('Amount1').setValue(this.POS.amount1);
     this.insertForm.get('Amount2').setValue(this.POS.amount2);
     this.insertForm.get('Amount3').setValue(this.POS.amount3);
     this.insertForm.get('Amount4').setValue(this.POS.amount4);
     this.insertForm.get('Amount5').setValue(this.POS.amount5);
     this.insertForm.get('Amount6').setValue(this.POS.amount6);
     this.insertForm.get('Amount7').setValue(this.POS.amount7);
     this.insertForm.get('Amount8').setValue(this.POS.amount8);
      */
      console.log(this.POS);
    },
    error => {
      console.log('Error:Problem getting the customer types ' + error);

  });

  }



}
