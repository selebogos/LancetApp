import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';
import { PatientService } from '../patient.service';
import { PatientViewModel } from '../_models/patientModel';
import { AddressModel } from '../_models/AddressModel';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  UserRole: FormControl;
  Email: FormControl;

  FullName:FormControl;
  Address:FormControl;
  Street:FormControl;
  Code:FormControl;
  Province:FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption:FormControl;
  User:PatientViewModel;
  id: number;
  address:AddressModel;
  private sub: any;
  IsRightUser:boolean;
  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private patientService: PatientService,
    private activateUIService:ActivatUIService,private SpinnerService: NgxSpinnerService,
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
    this.User = new PatientViewModel();
    this.address=new AddressModel();
    this.errorList = [];
    this.FullName = new FormControl('', [Validators.required, Validators.maxLength(55), Validators.minLength(3)]);
    this.Email=new FormControl();
    this.Address=new FormControl();

    this.insertForm = this.fb.group({
      "Email": this.Email,
      "FullName": this.FullName,
      "Address":this.Address,

    });

  }

  onSave() {

    try {
      debugger;
      this.SpinnerService.show();
      this.errorList=[];
      this.invalidUser=false;
      let details = this.insertForm.value;
      if(details.FullName===null || details.FullName===undefined || details.FullName==="" || details.FullName===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the patient's name and surname");
        return;
      }
      this.User.fullName=details.FullName;
      this.User.email=details.Email;
      this.User.address=details.Address;
      this.patientService.addPatient(this.User).subscribe(
        result => {
          debugger;
          this.SpinnerService.hide();
          if(result.id!==null && result.id!==undefined){

          this.invalidUser = false;
          this.isSuccessful = true;
            this.router.navigate(["/patients"]);
          }
          else{
        this.invalidUser=true;
        this.errorList.push("Please provide the patient's name and surname");
        return;
          }

        },
        error=>{
          for(var i=0;i<error.error.errors.fullName.length;i++){
            this.SpinnerService.hide();
            this.errorList.push(error.error.errors.FullName[i]);
            console.log(error.error.errors.FullName[i]);
            this.invalidUser = true;
            this.isSuccessful = false;
          }
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
