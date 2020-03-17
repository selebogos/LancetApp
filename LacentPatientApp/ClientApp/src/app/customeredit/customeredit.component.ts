import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerModel } from '../_models/CustomerModel';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.css']
})
export class CustomereditComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes=<any>[];
  Branch : FormControl;
  CustomerType: FormControl=new FormControl();
  VehicleRegistration: FormControl=new FormControl();
  Make: FormControl=new FormControl();
  Description: FormControl=new FormControl();
  Contact: FormControl=new FormControl();
  Name: FormControl=new FormControl();
  branches = <any>[];
  userrole:string;
  IsRightUser:boolean;
  roles:any;
  Userrole$: Observable<string>;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidCustomer = false;
  isSuccessful = false;
  selectedOption:FormControl=new FormControl();
  id: number;
  private sub: any;
  Customer:CustomerModel;
  selectedBranchOption: string;

  constructor(private branchService:BranchService,private activeRoute: ActivatedRoute,
    private register: RegisterService,private SpinnerService: NgxSpinnerService,
    private customerService:CustomerService,private router: Router,
    private activateUIService:ActivatUIService,private fb: FormBuilder) {

    this.branchService.getBranches().subscribe(
      data => {
        this.branches = data as any[];
        console.log(this.branches);
      },
      error => {
        console.log("Error:Problem getting the branches "+ error);

    });
    this.Customer = new CustomerModel();
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
    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

    this.errorList = [];
    this.CustomerType = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.VehicleRegistration = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Branch = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.insertForm = this.fb.group({
      "CustomerType": this.CustomerType,
      "VehicleRegistration": this.VehicleRegistration,
      "Make": this.Make,
      "Description": this.Description,
      "Contact": this.Contact,
      "CustomerId":this.id,
      "Name":this.Name,
      "Branch": this.Branch,
    });
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

    this.customerService.getCustomerDetails(this.id).subscribe(

      data => {
        this.Customer = data as any;

        this.VehicleRegistration.setValue(this.Customer.vehicleRegistration);
        this.Description.setValue(this.Customer.description);
        this.Make.setValue(this.Customer.make);
        this.Contact.setValue(this.Customer.contact);
        this.CustomerType.setValue(this.Customer.customerType);
        this.Name.setValue(this.Customer.fullName);
        //this.Name.setValue(this.Customer.branch);
        console.log(this.Customer);
      },
      error => {
        console.log('Error:Problem getting the customer types ' + error);

    });

  }

  onSave() {

    try {
      this.invalidCustomer = false;
      this.errorList=[];
      this.SpinnerService.show();
      let details = this.insertForm.value;
      this.CustomerType = this.selectedOption;
      details.CustomerType=this.CustomerType;

      if(details.CustomerType==="Please Select"  || details.CustomerType===null || details.CustomerType===undefined || details.CustomerType==="" || details.CustomerType===" ")
      {
        this.SpinnerService.hide();
        this.invalidCustomer=true;
        this.errorList.push("Please provide the customer type");
        return;
      }
      else if(details.VehicleRegistration===null || details.VehicleRegistration===undefined || details.VehicleRegistration==="" || details.VehicleRegistration===" "){
        this.SpinnerService.hide();
        this.invalidCustomer=true;
        this.errorList.push("Please provide the vehicle registration");
        return;
      }
      else if(details.Make===null || details.Make===undefined || details.Make==="" || details.Make===" "){
        this.SpinnerService.hide();
        this.invalidCustomer=true;
        this.errorList.push("Please provide the Make");
        return;
      }
      /*if(this.IsRightUser && (details.Branch===undefined || details.Branch==="" || details.Branch===" "))
      {
        this.invalidCustomer=true;
        this.errorList.push("Please provide the branch");
        return;
      }*/
      if(this.id<0)
      {
        this.SpinnerService.hide();
        this.invalidCustomer = true;
        this.errorList.push("Please try again");
        return;
      }

      this.customerService.updateCustomer(details.Name,this.id,details.CustomerType,details.VehicleRegistration
        ,details.Make,details.Description,details.Contact,details.Branch).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {

          this.router.navigate(["/customers"]);

          this.successMessage = result.message;
          this.invalidCustomer = false;
          this.isSuccessful = true;

          this.insertForm.controls['CustomerType'].disable();
          this.insertForm.controls['VehicleRegistration'].disable();
          this.insertForm.controls['Make'].disable();
          this.insertForm.controls['Description'].disable();
          this.insertForm.controls['Contact'].disable();
          this.SpinnerService.hide();
        }
        else {
          this.errorList.push(result.message);
          this.invalidCustomer = true;
          this.isSuccessful = false;

          this.insertForm.controls['CustomerType'].enable();
          this.insertForm.controls['VehicleRegistration'].enable();
          this.insertForm.controls['Make'].enable();
          this.insertForm.controls['Description'].enable();
          this.insertForm.controls['Contact'].enable();

        }
        return;


      },
        error => {
          this.SpinnerService.hide();
          console.log(error);
          this.errorList.push(error);
          this.invalidCustomer = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidCustomer = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }




}
