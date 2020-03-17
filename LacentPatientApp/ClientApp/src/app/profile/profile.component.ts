import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../_models/UserModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  User: UserModel;
  CustomerType: FormControl;
  VehicleRegistration: FormControl;
  Make: FormControl;
  Description: FormControl;
  Contact: FormControl;

  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption: FormControl;
  IsRightUser:boolean;
  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
     private customerService: CustomerService, private activateUIService:ActivatUIService,
     private router: Router, private fb: FormBuilder) {

    this.User = new UserModel();
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

    this.register.getProfileDetails().subscribe(

      data => {
        this.User = data as any;

        if(this.User.userRole === 'Manager')
        {
            this.User.userRole='Administrator';
            this.IsRightUser=true;
        }
        else if(this.User.userRole === 'User')
        {
          this.IsRightUser=false;
            this.User.userRole='Supervisor';
        }

        console.log(this.User);
      },
      error => {
        this.register.logout();
        console.log('Error:Problem getting the profile details ' + error);

    });

  }


}
