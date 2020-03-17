import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-editcustomertype',
  templateUrl: './editcustomertype.component.html',
  styleUrls: ['./editcustomertype.component.css']
})
export class EditcustomertypeComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidCustomerType = false;
  isSuccessful = false;
  customerTypes=[];
  CustomerType: CustomerTypeModel;

  id: number;
  private sub: any;

  constructor(private activeRoute: ActivatedRoute,private customerService: CustomerService,
    private register: RegisterService, private activateUIService:ActivatUIService,
    private router: Router, private fb: FormBuilder) {

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

   this.customerService.getCustomerTypeDetails(this.id).subscribe(

    data => {

      this.CustomerType = data as any;

      this.Name.setValue(this.CustomerType.name);
      console.log(this.CustomerType);
    },
    error => {
      console.log('Error:Problem getting the user details ' + error);

  });

  }

  onSave() {

    try {
      this.invalidCustomerType=false;
      this.errorList=[];
      let details = this.insertForm.value;
      this.customerService.updateCustomerType(details.Name,this.id).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/customertypes"]);
          this.successMessage = result.message;
          this.invalidCustomerType = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidCustomerType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;
       // this.router.navigate(['/customertypes']);

      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidCustomerType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidCustomerType = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }


  getCustomerTypes(){

    try{

      this.customerTypes =this.customerService.getCustomerTypes();

      return this.customerTypes;
    } catch(e){

    }
  }


}
