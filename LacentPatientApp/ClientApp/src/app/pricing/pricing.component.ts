import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { PosService } from '../pos.service';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { POSModel } from '../_models/PosModel';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { PricingdetailService } from '../pricingdetail.service';
import { PricingDetailModel } from '../_models/PricingDetailModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  Pricing: PricingDetailModel;
  CustomerType: FormControl;
  VehicleRegistration: FormControl;
  Make: FormControl;
  Description: FormControl;
  Contact: FormControl;
  totalAmount:number;
  cardPayments:number;
  errorList: string[];
  successMessage;
  invalidPricingDetails = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private pricingService:PricingdetailService,private activeRoute: ActivatedRoute, private register: RegisterService,
     private orderService: OrderService, private router: Router,
      private fb: FormBuilder,private posService: PosService,private activateUIService:ActivatUIService) {

    this.Pricing = new PricingDetailModel();


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


   this.pricingService.getPricingDetailsById(this.id).subscribe(

    data => {
      this.Pricing = data as any;
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ZAR',
      });
      //let a=parseFloat(this.POS.amount1.toString());
      const a1=parseFloat(this.Pricing.amount.toString());
      this.Pricing.amount=formatter.format(a1);
      this.Pricing.vehicleType=this.Pricing.vehicleType;
      this.Pricing.washType=this.Pricing.washType;
    },
    error => {
      console.log('Error:Problem getting the pricing details ' + error);

  });

  }

  deleteItem(id:number){
    this.pricingService.deletePricingItem(id).subscribe(
      data => {
        this.router.navigate(["/pricingdetails"]);
      },
      error => {
        console.log("Error:Problem deleting a pricing "+ error);

    });
  }
}
