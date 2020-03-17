import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../_models/UserModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { ActivatUIService } from '../activat-ui.service';
import { PatientViewModel } from '../_models/patientModel';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css']
})
export class PatientdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  User: PatientViewModel;
  Contact: FormControl;

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption: FormControl;
  IsRightUser:boolean;
  id: string;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private patientService: PatientService, private activateUIService:ActivatUIService,
     private router: Router, private fb: FormBuilder) {

    this.User = new PatientViewModel();
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
    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.patientService.getPatientDetails(this.id).subscribe(

      data => {
        this.User = data as any;
        console.log(this.User);
      },
      error => {
        this.register.logout();
        console.log('Error:Problem getting the patient details ' + error);

    });

  }

}
