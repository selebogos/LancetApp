import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../_models/UserModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientViewModel } from '../_models/patientModel';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientedit',
  templateUrl: './patientedit.component.html',
  styleUrls: ['./patientedit.component.css']
})
export class PatienteditComponent implements OnInit {

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
  id: string;
  private sub: any;
  IsRightUser:boolean;
  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private patientService: PatientService,private activateUIService:ActivatUIService,
    private SpinnerService: NgxSpinnerService,
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
    this.User = new PatientViewModel();
    this.errorList = [];
    this.FullName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Email=new FormControl();
    this.Address=new FormControl();

    this.insertForm = this.fb.group({
      "Email": this.Email,
      "FullName": this.FullName,
      "Address":this.Address,
      "id":this.id
    });

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

   this.patientService.getPatientDetails(this.id).subscribe(
      data => {
        this.User = data as any;
        console.log(this.User);
        this.FullName.setValue(this.User.fullName);
        this.Email.setValue(this.User.email);
            this.Address.setValue(this.User.address);

      },
      error => {
        console.log('Error:Problem getting the patient details ' + error);
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
        this.errorList.push("Please provide the patient's name");
        return;
      }
      this.User.fullName=details.FullName;
      this.User.email=details.Email;
      this.User.address=details.Address;
      this.User.Id=this.id;
      this.patientService.updatePatientDetails(this.User).subscribe(
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
