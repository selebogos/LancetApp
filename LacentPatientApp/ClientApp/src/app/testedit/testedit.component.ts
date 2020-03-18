import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestModel } from '../_models/TestModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { PatientService } from '../patient.service';
import { TestService } from '../test.service';
import { NormalrangevalueService } from '../normalrangevalue.service';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisitionService } from '../requisition.service';

@Component({
  selector: 'app-testedit',
  templateUrl: './testedit.component.html',
  styleUrls: ['./testedit.component.css']
})
export class TesteditComponent implements OnInit {

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
  id: string;
  private sub: any;
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

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.testResultService.getTestDetails(this.id).subscribe(
      data => {
        debugger;
        this.User = data as any;
        console.log(this.User);
        this.Name.setValue(this.User.name);
        this.Comment.setValue(this.User.comment);
        this.TestResults.setValue(this.User.testResultId);
        this.NormalRangeValue.setValue(this.User.normalValueId);
        this.searchTerm.setValue(this.User.requisition.requisitionNumber);
        this.RequisitionId=this.User.requisition.id;
      },
      error => {
        console.log('Error:Problem getting the test details ' + error);
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
      this.testResultService.updateTestDetails(this.User).subscribe(
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
            this.errorList.push("Please provide the test name,select requisition,select normal range value and test result");
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
