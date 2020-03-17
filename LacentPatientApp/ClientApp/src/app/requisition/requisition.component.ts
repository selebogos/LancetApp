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
import { RequisitionModel } from '../_models/RequisitionModel';
import { RequisitionService } from '../requisition.service';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.css']
})
export class RequisitionComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  UserRole: FormControl;
  Email: FormControl;
  searchTerm : FormControl = new FormControl();
  customerList  = <any>[];
  FullName:FormControl;
  Address:FormControl;
  ReferringPhysician:FormControl;
  DateSubmitted:FormControl;
  Province:FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption:FormControl;
  selectedCustomer = '';
  User:RequisitionModel;
  id: number;
  patientProfileId: string;
  address:AddressModel;
  private sub: any;
  IsRightUser:boolean;
  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private patientService: PatientService,
    private requisitionService: RequisitionService,
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
    this.User = new RequisitionModel();
    this.address=new AddressModel();
    this.errorList = [];
    this.ReferringPhysician = new FormControl('', [Validators.required, Validators.maxLength(55), Validators.minLength(3)]);
    this.DateSubmitted=new FormControl();
    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {

          this.patientService.search(term).subscribe(
            data => {
              debugger;
              this.customerList = data as any[];
          });
        }
    });
    this.insertForm = this.fb.group({
      "ReferringPhysician": this.ReferringPhysician,
      "DateSubmitted": this.DateSubmitted,
      "patient":this.searchTerm.value
    });

  }
  getPatientDetails(profileId:string){
    this.patientProfileId=profileId;
  }
  onSave() {

    try {
      debugger;
      this.SpinnerService.show();
      this.errorList=[];
      this.invalidUser=false;
      let details = this.insertForm.value;
      if(details.ReferringPhysician===null || details.ReferringPhysician===undefined || details.ReferringPhysician==="" || details.ReferringPhysician===" ")
      {
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the referring Physician");
        return;
      }
      this.User.referringPhysician=details.ReferringPhysician;
      this.User.dateSubmitted=details.DateSubmitted;
      this.User.profileId=this.patientProfileId;
      this.requisitionService.addRequisition(this.User).subscribe(
        result => {
          debugger;
          this.SpinnerService.hide();
          if(result.id!==null && result.id!==undefined){

          this.invalidUser = false;
          this.isSuccessful = true;
            this.router.navigate(["/requisitions"]);
          }
          else{
        this.invalidUser=true;
        this.errorList.push("Please provide the refering physician");
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
