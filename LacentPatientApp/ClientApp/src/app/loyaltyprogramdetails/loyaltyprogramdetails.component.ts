import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../register.service';
import { PaymentmethodService } from '../paymentmethod.service';
import { PricingdetailService } from '../pricingdetail.service';
import { WashtypeService } from '../washtype.service';
import { VehicletypeService } from '../vehicletype.service';
import { DiscountService } from '../discount.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoyaltyprogramService } from '../loyaltyprogram.service';
import { Observable } from 'rxjs';
import { LoyaltyProgramModel } from '../_models/LoyaltyProgramModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-loyaltyprogramdetails',
  templateUrl: './loyaltyprogramdetails.component.html',
  styleUrls: ['./loyaltyprogramdetails.component.css']
})
export class LoyaltyprogramdetailsComponent implements OnInit {

  public title = 'Loyalty Program';

  NoOfWashes:FormControl;

  Percentage:FormControl;

  errorList: string[];
  successMessage;
  invalidLoyaltyProgram = false;
  isSuccessful = false;
  selectedOption:FormControl;
  selectedCustomer = '';
  closeResult: string;
  insertForm: FormGroup;
  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  id: number;
  private sub: any;
  LoyaltyProgram:LoyaltyProgramModel

  constructor(private loyaltyService:LoyaltyprogramService,private activeRoute: ActivatedRoute,
     private register: RegisterService, private router: Router,
     private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.LoyaltyProgram=new LoyaltyProgramModel();

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
    this.NoOfWashes = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
      this.Percentage = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);

      this.insertForm = this.fb.group({
        "Percentage":this.Percentage,
        "NoOfWashes":this.NoOfWashes,
      });

   this.loyaltyService.getDetails().subscribe(
    data => {

      this.LoyaltyProgram = data as any;
      this.NoOfWashes.setValue(this.LoyaltyProgram.noOfWashes);
      this.Percentage.setValue(this.LoyaltyProgram.percentage);
      console.log(this.LoyaltyProgram);
    },
    error => {
      console.log('Error:Problem getting the loyalty program details ' + error);
    });

  }
  onSave(){}
}
