import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { POSModel } from '../_models/PosModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { OrderService } from '../order.service';
import { PosService } from '../pos.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-moneyintilledit',
  templateUrl: './moneyintilledit.component.html',
  styleUrls: ['./moneyintilledit.component.css']
})
export class MoneyintilleditComponent implements OnInit {

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

  successMessage;
  invalidTill = false;

  errorList: string[];

  invalidCustomer = false;
  isSuccessful = false;
  selectedOption: FormControl;

  Amount1: FormControl;
  Amount2: FormControl;
  Amount3: FormControl;
  Amount4: FormControl;
  Amount5: FormControl;
  Amount6: FormControl;
  Amount7: FormControl;
  Amount8: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private orderService: OrderService, private router: Router,
      private fb: FormBuilder,private posService: PosService,private activateUIService:ActivatUIService) {

    this.POS = new POSModel();
  }

  ngOnInit() {

    this.errorList = [];

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

   this.Amount1 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount2 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount3 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount4 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount5 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount6 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount7 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount8 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);

    this.Amount1.setValue(0);
    this.Amount2.setValue(0);
   this.Amount3.setValue(0);
   this.Amount4.setValue(0);
    this.Amount5.setValue(0),
    this.Amount6.setValue(0);
   this.Amount7.setValue(0);
    this.Amount8.setValue(0);

    this.insertForm = this.fb.group({

      "Amount1": this.Amount1,
      "Amount2": this.Amount2,
      "Amount3": this.Amount3,
      "Amount4": this.Amount4,
      "Amount5": this.Amount5,
      "Amount6": this.Amount6,
      "Amount7": this.Amount7,
      "Amount8": this.Amount8,

    });

   this.posService.getTillDetails(this.id).subscribe(

    data => {

      this.POS = data as any;

     this.insertForm.get('Amount1').setValue(this.POS.amount1);
     this.insertForm.get('Amount2').setValue(this.POS.amount2);
     this.insertForm.get('Amount3').setValue(this.POS.amount3);
     this.insertForm.get('Amount4').setValue(this.POS.amount4);
     this.insertForm.get('Amount5').setValue(this.POS.amount5);
     this.insertForm.get('Amount6').setValue(this.POS.amount6);
     this.insertForm.get('Amount7').setValue(this.POS.amount7);
     this.insertForm.get('Amount8').setValue(this.POS.amount8);

      console.log(this.POS);
    },
    error => {
      console.log('Error:Problem getting the customer types ' + error);

  });

  }


  onSave() {

    try {
      let details = this.insertForm.value;

      if(details.Amount1<=0 && details.Amount2<=0 && details.Amount3<=0 &&
        details.Amount4<=0 && details.Amount5<=0 && details.Amount6<=0 && details.Amount7<=0 && details.Amount8<=0)
        {
          this.invalidTill=true;
          this.errorList.push("Please provide amount(s) for the till in Quantities");
          return;
        }

      this.posService.updateTill(details.Amount1,details.Amount2,details.Amount3,details.Amount4,
        details.Amount5,details.Amount6,details.Amount7,details.Amount8,this.id).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/tills"]);
          this.successMessage = result.message;
          this.invalidTill = false;
          this.isSuccessful = true;

        }
        else {
          this.errorList.push(result.message);
          this.invalidTill = true;
          this.isSuccessful = false;

        }
        return;


      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidTill = true;
          this.isSuccessful = false;

        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidTill = true;
      this.isSuccessful = false;

    }
    return;

  }



}
