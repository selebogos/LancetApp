import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerTypeModel } from '../_models/CustomerTypeModel';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { RegisterService } from '../register.service';
import { BranchService } from '../branch.service';
import { BranchModel } from '../_models/BranchModel';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-branchdetails',
  templateUrl: './branchdetails.component.html',
  styleUrls: ['./branchdetails.component.css']
})
export class BranchdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  Branch: BranchModel;


  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidBranch = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute,private branchService:BranchService ,
    private register: RegisterService, private customerService: CustomerService,
    private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.Branch = new BranchModel();
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

    this.branchService.getBranchDetails(this.id).subscribe(

      data => {
        this.Branch = data as any;

        console.log(this.Branch);
      },
      error => {
        console.log('Error:Problem getting the branch details ' + error);

    });

  }


}
