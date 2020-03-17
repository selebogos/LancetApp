import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PosService } from '../pos.service';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-moneyintill',
  templateUrl: './moneyintill.component.html',
  styleUrls: ['./moneyintill.component.css']
})
export class MoneyintillComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes=<any>[];

  Amount1: FormControl;
  Amount2: FormControl;
  Amount3: FormControl;
  Amount4: FormControl;
  Amount5: FormControl;
  Amount6: FormControl;
  Amount7: FormControl;
  Amount8: FormControl;

  Branch : FormControl;
  userrole:string;
  IsRightUser:boolean;
  roles:any;
  branches = <any>[];
  selectedBranchOption: string;
  Userrole$: Observable<string>;

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidTill = false;
  isSuccessful = false;


  constructor(private posService:PosService,private register: RegisterService,
    private customerService:CustomerService,
    private router: Router, private fb: FormBuilder,
    private branchService:BranchService,private activateUIService:ActivatUIService) {

    this.branchService.getBranches().subscribe(
      data => {
        this.branches = data as any[];
        console.log(this.branches);
      },
      error => {
        console.log("Error:Problem getting the branches "+ error);
    });
    this.customerService.getCustomerTypes().subscribe(

      data => {
        this.customerTypes = data as any[];
        console.log(this.customerTypes);
      },
      error => {
        console.log("Error:Problem getting the customer types " + error);

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
    this.Userrole$ = this.register.currentUserRole;
    this.Userrole$.subscribe(data=>{
        console.log('am i logged in as ', data);
        if(data==='Manager')
        {
          this.IsRightUser=true;
        }
        this.userrole=data;
    });

    this.register.getUserrole().subscribe(

      data => {
        this.roles = data as any;

        console.log(this.roles);
        if(this.roles.length>0 && this.roles[0]==='Manager')
        {
          this.IsRightUser=true;
          this.userrole=this.roles[0];
        }
        else{
          this.IsRightUser=false;
          this.userrole=this.roles[0];
        }

      },
      error => {
        console.log('Error:Problem getting the user role ' + error);

    });

    //this.customerTypes = this.customerService.getCustomerTypes();

    this.errorList = [];
    this.Amount1 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount2 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount3 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount4 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount5 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount6 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount7 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Amount8 = new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/) ]);
    this.Branch = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

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
      "Branch": this.Branch,
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
        if(this.IsRightUser && (details.Branch===undefined || details.Branch==="" || details.Branch===" "))
      {
        this.invalidTill=true;
        this.errorList.push("Please provide the branch");
        return;
      }

      this.posService.addTill(details.Amount1,details.Amount2,details.Amount3,details.Amount4,
        details.Amount5,details.Amount6,details.Amount7,details.Amount8,details.Branch).subscribe(result => {

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
