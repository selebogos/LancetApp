import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientViewModel } from '../_models/patientModel';
import { AddressModel } from '../_models/AddressModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { PatientService } from '../patient.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TestService } from '../test.service';
import { NormalrangevalueService } from '../normalrangevalue.service';
import { TestModel } from '../_models/TestModel';
import { RequisitionService } from '../requisition.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  UserRole: FormControl;
  Name:FormControl;
  Comment:FormControl;
  TestResults:FormControl;
  NormalRangeValue:FormControl;
  testResults=<any>[];
  normalRangeValues=<any>[];
  selectedCustomer = '';
  searchTerm : FormControl = new FormControl();
  customerList  = <any>[];
  RequisitionId:string;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedTestResultOption:FormControl;
  selectedNormalRangeOption:FormControl;
  User:TestModel;
  id: number;
  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private patientService: PatientService,private testResultService:TestService,
    private normalRangeValueService:NormalrangevalueService,
    private activateUIService:ActivatUIService,private SpinnerService: NgxSpinnerService,
    private requisionService:RequisitionService,
    private router: Router, private fb: FormBuilder) {

      this.testResultService.getTestResults().subscribe(
        data => {
          this.testResults = data as any[];
          console.log(this.testResults);
        },
        error => {
          console.log("Error:Problem getting the test result" + error);
      });
      this.normalRangeValueService.getNormalRangeValues().subscribe(
        data => {
          this.normalRangeValues = data as any[];
          console.log(this.testResults);
        },
        error => {
          console.log("Error:Problem getting the normal range values" + error);
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
    this.User = new TestModel();
    this.errorList = [];
    this.Name = new FormControl('', [Validators.required, Validators.maxLength(55), Validators.minLength(3)]);
    this.Comment=new FormControl('');
    this.TestResults=new FormControl();
    this.NormalRangeValue=new FormControl();
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {

          this.requisionService.search(term).subscribe(
            data => {
              debugger;
              this.customerList = data as any[];
          });
        }
    });
    this.insertForm = this.fb.group({
      "Name": this.Name,
      "Comment": this.Comment,
      "SearchTerm":this.searchTerm,
      "TestResults":this.TestResults,
      "NormalRangeValue":this.NormalRangeValue
    });

  }

  getRequisitionDetails(requisitionId:string){
    this.RequisitionId=requisitionId;
  }

  onSave() {

    try {
      debugger;
      this.SpinnerService.show();
      this.errorList=[];
      this.invalidUser=false;
      let details = this.insertForm.value;
      if(details.Name===null || details.Name===undefined || details.Name==="" || details.Name===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the test name");
        return;
      }
      if(this.TestResults.value===null || this.TestResults.value===undefined || this.TestResults.value==="" || this.TestResults.value===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please select the test result");
        return;
      }
      if(this.NormalRangeValue.value===null || this.NormalRangeValue.value===undefined || this.NormalRangeValue.value==="" || this.NormalRangeValue.value===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please select the normal range value");
        return;
      }
      if(this.RequisitionId===null || this.RequisitionId===undefined || this.RequisitionId==="" || this.RequisitionId===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please select the requisition number");
        return;
      }
      this.User.name=details.Name;
      this.User.comment=details.Comment;
      this.User.requisitionId=this.RequisitionId;
      this.User.testResultId=parseInt(details.TestResults);
      this.User.normalValueId=parseInt(details.NormalRangeValue);
      this.testResultService.addTest(this.User).subscribe(
        result => {
          debugger;
          this.SpinnerService.hide();
          if(result.id!==null && result.id!==undefined){
            this.invalidUser = false;
            this.isSuccessful = true;
            this.router.navigate(["/tests"]);
          }
          else
          {
            this.invalidUser=true;
            this.errorList.push("Please provide the test name");
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
