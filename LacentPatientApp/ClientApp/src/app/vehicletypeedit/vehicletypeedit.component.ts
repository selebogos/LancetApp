import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WashTypeModel } from '../_models/WashTypeModel';
import { ActivatedRoute, Router } from '@angular/router';
import { WashtypeService } from '../washtype.service';
import { RegisterService } from '../register.service';
import { VehicleTypeModel } from '../_models/VehicleTypeModel';
import { VehicletypeService } from '../vehicletype.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-vehicletypeedit',
  templateUrl: './vehicletypeedit.component.html',
  styleUrls: ['./vehicletypeedit.component.css']
})
export class VehicletypeeditComponent implements OnInit {


  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidVehicleType = false;
  isSuccessful = false;
  customerTypes=[];
  VehicleType: VehicleTypeModel;

  id: number;
  private sub: any;

  constructor(private activeRoute: ActivatedRoute,private vehicleService: VehicletypeService,
    private register: RegisterService,private activateUIService:ActivatUIService,
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

   this.vehicleService.getVehicleTypeDetails(this.id).subscribe(

    data => {

      this.VehicleType = data as any;

      this.Name.setValue(this.VehicleType.name);
      console.log(this.VehicleType);
    },
    error => {
      console.log('Error:Problem getting the vehicle type details ' + error);

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
      this.vehicleService.updatVehicleType(details.Name,this.id).subscribe(result => {

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
       // this.router.navigate(['/customertypes']);

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
