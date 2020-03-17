import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;

  branches = <any>[];
  UserRole: FormControl;
  Email: FormControl;
  LastName: FormControl;
  FirstName: FormControl;
  Password: FormControl;
  RepeatPassword: FormControl;
  Active : FormControl;
  Branch : FormControl;

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption : FormControl;
  IsActive : boolean;
  check:any;
  selectedBranchOption: string;

  constructor(private register: RegisterService,private customerService:CustomerService,private router: Router,
    private fb: FormBuilder,private branchService:BranchService,private activateUIService:ActivatUIService,private SpinnerService: NgxSpinnerService) {

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
    this.activateUIService.initToggle();
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

    this.errorList = [];
    this.UserRole = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.FirstName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.LastName = new FormControl();
    this.Email = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Active = new FormControl('',[Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Password = new FormControl('', [Validators.required,Validators.maxLength(15)]);
    this.RepeatPassword = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]);
    this.errorList=[];
    this.Branch = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.IsActive=false;

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

  }

  onSave() {

    try {
      this.SpinnerService.show();
      let details = this.insertForm.value;
      this.UserRole = this.selectedOption;
      details.UserRole=this.UserRole;
      this.invalidUser=false;
      this.errorList=[];

      if(details.UserRole===undefined || details.UserRole==="" || details.UserRole===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the user role");
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
      else if(details.Password===undefined || details.Password==="" || details.Password===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the password");
        return;
      }
      else if(details.RepeatPassword===undefined || details.RepeatPassword==="" || details.RepeatPassword===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the repeat password");
        return;
      }
      else if(details.Password !== details.RepeatPassword){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the ensure that the passwords are the same");
        return;
      }
      else if(details.Branch===undefined || details.Branch==="" || details.Branch===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the branch");
        return;
      }

      this.register.addUser(this.IsActive,details.UserRole,details.FirstName,
        details.LastName,details.Email,details.Password,details.Branch).subscribe(result => {
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

    if(this.IsActive===false)
      this.IsActive=true;
    else
      this.IsActive=false;

  }


}
