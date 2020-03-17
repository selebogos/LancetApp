import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../_models/UserModel';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {


  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  selectedBranchOption: string;
  UserRole: FormControl;
  Email: FormControl;
  LastName: FormControl;
  FirstName: FormControl;
  Password: FormControl;
  RepeatPassword: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption:FormControl;
  User:UserModel;
  id: number;
  private sub: any;

  IsActive : boolean;
  Active : FormControl;
  check:any;
  Branch : FormControl;
  branches = <any>[];

  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,private SpinnerService: NgxSpinnerService,
    private customerService:CustomerService,private activateUIService:ActivatUIService,
    private router: Router,private fb: FormBuilder,private branchService:BranchService) {

      this.branchService.getBranches().subscribe(
        data => {
          this.branches = data as any[];
          console.log(this.branches);
        },
        error => {
          console.log("Error:Problem getting the branches "+ error);

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
    //this.customerTypes = this.customerService.getCustomerTypes();
    this.User = new UserModel();
    this.errorList = [];
    this.IsActive = false;

    this.UserRole = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.FirstName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.LastName = new FormControl();
    this.Email = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Active = new FormControl('',[Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Password = new FormControl('', [Validators.required,Validators.maxLength(15), Validators.minLength(8), Validators.pattern
      (/[0-9a-zA-Z]{6,}/)]);
    this.RepeatPassword = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8), Validators.pattern
      (/[0-9a-zA-Z]{6,}/)]);
      this.Branch = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.insertForm = this.fb.group({
      "Email": this.Email,
      "UserRole": this.UserRole,
      "FirstName": this.FirstName,
      "LastName": this.LastName,
      "Password":this.Password,
      "RepeatPassword":this.RepeatPassword,
      "Active":this.Active,
      "Branch": this.Branch,
    });

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

    this.register.getUserDetails(this.id).subscribe(

      data => {

        this.User = data as any;
        console.log(this.User);
        this.LastName.setValue(this.User.lastname);
        this.FirstName.setValue(this.User.firstname);
        this.Email.setValue(this.User.email);
        this.Branch.setValue(this.User.branch);
        this.selectedBranchOption=this.User.branch;
        if(this.User.userRole === 'Manager')
          this.User.userRole='Administrator';
        else if(this.User.userRole === 'User')
          this.User.userRole='Supervisor';

        this.UserRole.setValue(this.User.userRole);
        this.IsActive = this.User.isActive;

      },
      error => {
        console.log('Error:Problem getting the user details ' + error);

    });

  }

  onSave() {

    try {
      this.invalidUser=false;
      this.errorList=[];
      this.SpinnerService.show();
      let details = this.insertForm.value;
      this.UserRole = this.selectedOption;

      details.UserRole=this.UserRole;

      if(details.UserRole===undefined || details.UserRole==="" || details.UserRole===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the user role");
        return;
      }
      else if(details.Branch===undefined || details.Branch==="" || details.Branch===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the branch");
        return;
      }
      else if(details.FirstName===undefined || details.FirstName==="" || details.FirstName===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the first name");
        return;
      }
      else if(details.Email===undefined || details.Email==="" || details.Email===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the email");
        return;
      }

      this.register.updateUser(this.IsActive,details.UserRole,details.FirstName,details.LastName,
        details.Email,details.Password,this.id,details.Branch).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/userlist"]);

        }
        else {
          this.errorList.push(result.message);
          this.invalidUser = true;
          this.isSuccessful = false;

          this.insertForm.controls['UserRole'].enable();
          this.insertForm.controls['FirstName'].enable();
          this.insertForm.controls['LastName'].enable();
          this.insertForm.controls['Password'].enable();
          this.insertForm.controls['RepeatPassword'].enable();

        }
        return;
      },
        error => {
          this.SpinnerService.hide();
          console.log(error);

          for(let i=0;i<error.error.value.length;i++){
            this.errorList.push(error.error.value[i]);
          }

          this.invalidUser = true;
          this.isSuccessful = false;

        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidUser = true;
      this.isSuccessful = false;

    }
    return;

  }

  activated($event){

    this.IsActive = $event.target.checked;
    console.log($event);
    return;

  }

}
