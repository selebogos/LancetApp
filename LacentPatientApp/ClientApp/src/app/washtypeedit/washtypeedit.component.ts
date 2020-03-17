import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { RegisterService } from '../register.service';
import { WashTypeModel } from '../_models/WashTypeModel';
import { WashtypeService } from '../washtype.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-washtypeedit',
  templateUrl: './washtypeedit.component.html',
  styleUrls: ['./washtypeedit.component.css']
})
export class WashtypeeditComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidWashType = false;
  isSuccessful = false;
  customerTypes=[];
  WashType: WashTypeModel;

  id: number;
  private sub: any;

  constructor(private activeRoute: ActivatedRoute,private washService: WashtypeService,
    private register: RegisterService, private router: Router,
    private fb: FormBuilder,private activateUIService:ActivatUIService) {

  }

  ngOnInit() {

    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
    this.successMessage = "";
    this.errorList = [];

    this.LoginStatus$.subscribe((data: boolean) => {
      console.log('am i logged in ', data);
      this.IsLoggedIn = data;

    });


    if (!this.IsLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();

    this.errorList = [];
    this.Name = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);

    this.insertForm = this.fb.group({

      "Name": this.Name

    });

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

   this.washService.getWashTypeDetails(this.id).subscribe(

    data => {

      this.WashType = data as any;

      this.Name.setValue(this.WashType.name);
      console.log(this.WashType);
    },
    error => {
      console.log('Error:Problem getting the wash type details ' + error);

  });

  }

  onSave() {

    try {
      this.errorList=[];
      this.invalidWashType = false;
      let details = this.insertForm.value;
      if(details.Name===null || details.Name===undefined || details.Name==="" || details.Name===" ")
      {
        this.invalidWashType=true;
        this.errorList.push("Please provide the wash type");
        return;
      }
      this.washService.updateWashType(details.Name,this.id).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/washtypes"]);
          this.successMessage = result.message;
          this.invalidWashType = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidWashType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;
       // this.router.navigate(['/customertypes']);

      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidWashType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidWashType = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }





}
