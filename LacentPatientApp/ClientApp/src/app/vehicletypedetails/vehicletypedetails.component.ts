import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleTypeModel } from '../_models/VehicleTypeModel';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WashtypeService } from '../washtype.service';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { WashTypeModel } from '../_models/WashTypeModel';
import { VehicletypeService } from '../vehicletype.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-vehicletypedetails',
  templateUrl: './vehicletypedetails.component.html',
  styleUrls: ['./vehicletypedetails.component.css']
})
export class VehicletypedetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  VehicleType: VehicleTypeModel;


  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidVehicleType = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute,private vehicleTypeService:VehicletypeService ,private register: RegisterService,
    private customerService: CustomerService, private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.VehicleType = new VehicleTypeModel();
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
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

    this.vehicleTypeService.getVehicleTypeDetails(this.id).subscribe(

      data => {
        this.VehicleType = data as any;

        console.log(this.VehicleType);
      },
      error => {
        console.log('Error:Problem getting the vehicle details ' + error);

    });

  }

}
