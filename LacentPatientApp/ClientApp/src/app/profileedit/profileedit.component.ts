import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../_models/UserModel';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css']
})
export class ProfileeditComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  UserRole: FormControl;
  Email: FormControl;
  LastName: FormControl;
  FirstName: FormControl;
  Password: FormControl;
  RepeatPassword: FormControl;
  BusinessName:FormControl;
  City:FormControl;
  Street:FormControl;
  PostalCode:FormControl;
  Suburb:FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption:FormControl;
  User:UserModel;
  id: number;
  private sub: any;
  IsRightUser:boolean;
  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private customerService:CustomerService,private activateUIService:ActivatUIService,private SpinnerService: NgxSpinnerService,
    private router: Router, private fb: FormBuilder) {
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

    this.UserRole = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.FirstName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.LastName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Email = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.BusinessName=new FormControl();
    this.Street=new FormControl();
    this.City=new FormControl();
    this.PostalCode=new FormControl();
    this.Suburb=new FormControl();

    this.insertForm = this.fb.group({
      "Email": this.Email,
      "UserRole": this.UserRole,
      "FirstName": this.FirstName,
      "LastName": this.LastName,
      "BusinessName":this.BusinessName,
      "Street":this.Street,
      "City":this.City,
      "PostalCode":this.PostalCode,
      "Suburb":this.Suburb,
    });

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

    this.register.getProfileDetails().subscribe(

      data => {

        this.User = data as any;
        console.log(this.User);
        this.LastName.setValue(this.User.lastname);
        this.FirstName.setValue(this.User.firstname);
        this.Email.setValue(this.User.email);
        if(this.User.userRole === 'Manager')
        {
            this.User.userRole='Administrator';
            this.IsRightUser=true;
            this.PostalCode.setValue(this.User.postalCode);
            this.Street.setValue(this.User.street);
            this.City.setValue(this.User.city);
            this.Suburb.setValue(this.User.suburb);
            this.BusinessName.setValue(this.User.businessName);
        }
        else if(this.User.userRole === 'User')
        {
          this.IsRightUser=false;
          this.User.userRole='Supervisor';
        }
        this.UserRole.setValue(this.User.userRole);

      },
      error => {
        console.log('Error:Problem getting the user details ' + error);

    });

  }

  onSave() {

    try {
      this.SpinnerService.show();
      this.errorList=[];
      this.invalidUser=false;
      let details = this.insertForm.value;
      this.UserRole = this.selectedOption;
      details.UserRole=this.UserRole;
      if(details.UserRole===null || details.UserRole===undefined || details.UserRole==="" || details.UserRole===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the user role");
        return;
      }
      else if(details.FirstName===null || details.FirstName===undefined || details.FirstName==="" || details.FirstName===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the first name");
        return;
      }
      else if(details.Email===null || details.Email===undefined || details.Email==="" || details.Email===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the email");
        return;
      }

      this.register.updateProfileDetails(details.UserRole,details.FirstName,details.LastName,details.Email,
        details.Password,details.BusinessName,details.Street,details.City,details.Suburb,details.PostalCode).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/profile"]);
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


}
