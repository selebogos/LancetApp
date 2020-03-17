import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicletypeService } from '../vehicletype.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-vehicletype',
  templateUrl: './vehicletype.component.html',
  styleUrls: ['./vehicletype.component.css']
})
export class VehicletypeComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidVehicleType = false;
  isSuccessful = false;

  constructor(private vehicleService: VehicletypeService, private register: RegisterService,
    private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

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

  }

  onSave() {

    try {
      this.errorList=[];
      this.invalidVehicleType = false;
      let details = this.insertForm.value;
      if(details.Name===null || details.Name===undefined || details.Name==="" || details.Name===" ")
      {
        this.invalidVehicleType=true;
        this.errorList.push("Please provide the vehicle type");
        return;
      }
      this.vehicleService.addVehicleType(details.Name).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/vehicletypes"]);
          this.successMessage = result.message;
          this.invalidVehicleType = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidVehicleType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;


      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidVehicleType = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidVehicleType = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }


}
