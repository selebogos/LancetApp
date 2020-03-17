import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { UserModel } from '../_models/UserModel';
import { ActivatUIService } from '../activat-ui.service';


@Component({
  selector: 'app-customertypedetails',
  templateUrl: './customertypedetails.component.html',
  styleUrls: ['./customertypedetails.component.css']
})
export class CustomertypedetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  CustomerType: CustomerTypeModel;


  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidCustomerType = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute,private customerTypeService:CustomerService ,
    private register: RegisterService, private customerService: CustomerService,
     private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.CustomerType = new CustomerTypeModel();
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

    this.customerService.getCustomerTypeDetails(this.id).subscribe(

      data => {
        this.CustomerType = data as any;

        console.log(this.CustomerType);
      },
      error => {
        console.log('Error:Problem getting the user details ' + error);

    });

  }

}
