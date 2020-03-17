import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PosService } from '../pos.service';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { POSModel } from '../_models/PosModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-cashonhandedit',
  templateUrl: './cashonhandedit.component.html',
  styleUrls: ['./cashonhandedit.component.css']
})
export class CashonhandeditComponent implements OnInit {


  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
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

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidTill = false;
  isSuccessful = false;
  POS: POSModel;
  id: number;
  private sub: any;

  constructor(private activeRoute: ActivatedRoute,private posService:PosService,private register: RegisterService,
    private customerService:CustomerService,private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {
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

    this.LoginStatus$.subscribe((data: boolean) =>
    {
        console.log('am i logged in ', data);
        this.IsLoggedIn = data;
    });

    if(!this.IsLoggedIn){
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();
    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    //this.customerTypes = this.customerService.getCustomerTypes();

    this.errorList = [];
    this.POS = new POSModel();
    this.totalAmount=0;
    this.cardPayments=0;

    this.Amount1 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount2 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount3 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount4 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount5 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount6 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount7 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount8 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
   // this.Amount8 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Note=new FormControl();

    this.insertForm = this.fb.group({

      "Amount1": this.Amount1,
      "Amount2": this.Amount2,
      "Amount3": this.Amount3,
      "Amount4": this.Amount4,
      "Amount5": this.Amount5,
      "Amount6": this.Amount6,
      "Amount7": this.Amount7,
      "Amount8": this.Amount8,
      'Note':this.Note

    });

    this.posService.getCashOnHandDetails(this.id).subscribe(

      data => {

        this.POS = data as any;

        this.Amount1.setValue(this.totalAmount);
        this.Amount2.setValue(this.POS.amount2);

        this.Amount3.setValue(this.POS.amount3);
        this.Amount4.setValue(this.POS.amount4);
        this.Amount5.setValue(this.POS.amount5),
        this.Amount6.setValue(this.POS.amount6);
        this.Amount7.setValue(this.POS.amount7);
        this.Amount8.setValue(this.POS.amount8);
        this.Note.setValue(this.POS.note);

        console.log(this.POS);
      },
      error => {
        console.log('Error:Problem getting the customer types ' + error);

    });



  }

  onSave() {

    try {
      let details = this.insertForm.value;


      this.posService.updateCashOnHand(details.Amount1,details.Amount2,details.Amount3,details.Amount4,details.Amount5,details.Amount6,details.Amount7,details.Amount8,details.Note,this.id).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/cashonhands"]);
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
