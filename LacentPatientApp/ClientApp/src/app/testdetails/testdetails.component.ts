import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisitionModel } from '../_models/RequisitionModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { PatientService } from '../patient.service';
import { ActivatUIService } from '../activat-ui.service';
import { RequisitionService } from '../requisition.service';
import { TestModel } from '../_models/TestModel';
import { TestService } from '../test.service';

@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  User: TestModel;
  Contact: FormControl;
  patientId:string;
  insertForm: FormGroup;
  requisitionNumber:number;
  requisitionId:string;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption: FormControl;
  IsRightUser:boolean;
  testResultDescription:"";
  normalRangeDescription:"";
  id: string;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private patientService: PatientService, private activateUIService:ActivatUIService,
     private testService: TestService,
     private router: Router, private fb: FormBuilder) {

    this.User = new TestModel();
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

  this.testService.getTestDetails(this.id).subscribe(
    data => {
      debugger;
      this.User = data as any;
      this.requisitionNumber=data.requisition.requisitionNumber;
      this.requisitionId=data.requisition.id;
      this.testResultDescription=data.testResult.description;
      this.normalRangeDescription=data.normalValue.description;
      console.log(this.User);
    },
    error => {
      this.register.logout();
      console.log('Error:Problem getting the requisition details ' + error);
  });
}
}
