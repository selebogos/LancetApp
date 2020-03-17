import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { RegisterService } from '../register.service';
import { WashTypeModel } from '../_models/WashTypeModel';
import { WashtypeService } from '../washtype.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-washtypedetails',
  templateUrl: './washtypedetails.component.html',
  styleUrls: ['./washtypedetails.component.css']
})
export class WashtypedetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  WashType: WashTypeModel;


  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidWashType = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute,private washTypeService:WashtypeService ,private register: RegisterService,
    private customerService: CustomerService, private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.WashType = new WashTypeModel();
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

    this.washTypeService.getWashTypeDetails(this.id).subscribe(

      data => {
        this.WashType = data as any;

        console.log(this.WashType);
      },
      error => {
        console.log('Error:Problem getting the wash details ' + error);

    });

  }


}
