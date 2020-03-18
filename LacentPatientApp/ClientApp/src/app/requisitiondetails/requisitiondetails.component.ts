import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientViewModel } from '../_models/patientModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { PatientService } from '../patient.service';
import { ActivatUIService } from '../activat-ui.service';
import { RequisitionModel } from '../_models/RequisitionModel';
import { RequisitionService } from '../requisition.service';

@Component({
  selector: 'app-requisitiondetails',
  templateUrl: './requisitiondetails.component.html',
  styleUrls: ['./requisitiondetails.component.css']
})
export class RequisitiondetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  User: RequisitionModel;
  Contact: FormControl;
  patientId:string;
  insertForm: FormGroup;
  patient:string;
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
     private requisitionService: RequisitionService,
     private router: Router, private fb: FormBuilder) {

    this.User = new RequisitionModel();
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
    this.requisitionService.getRequisitionDetails(this.id).subscribe(
      data => {
        debugger;
        this.User = data as any;
        this.patient=data.profile.patient.fullName;
        this.patientId=data.profile.patient.id;
        console.log(this.User);
      },
      error => {
        this.register.logout();
        console.log('Error:Problem getting the requisition details ' + error);
    });
  }
}
