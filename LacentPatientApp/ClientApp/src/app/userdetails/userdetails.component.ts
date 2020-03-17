import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../_models/CustomerModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { UserModel } from '../_models/UserModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

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

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute, private register: RegisterService,
    private customerService: CustomerService,
    private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

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

    this.register.getUserDetails(this.id).subscribe(

      data => {
        this.User = data as any;

        if(this.User.userRole === 'Manager')
          this.User.userRole='Administrator';
        else if(this.User.userRole === 'User')
          this.User.userRole='Supervisor';

        console.log(this.User);
      },
      error => {
        console.log('Error:Problem getting the user details ' + error);

    });

  }

}
