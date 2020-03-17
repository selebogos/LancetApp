import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;

  IsLoggedIn = false;
  Name: FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidBranchName = false;
  isSuccessful = false;
  customerTypes=[];

  constructor(private branchService: BranchService, private register: RegisterService,
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
      let details = this.insertForm.value;
      this.branchService.addBranch(details.Name).subscribe(result => {

        if (result.message === "Successful") {
          this.router.navigate(["/branches"]);
          this.successMessage = result.message;
          this.invalidBranchName = false;
          this.isSuccessful = true;
          this.insertForm.controls['Name'].disable();
        }
        else {
          this.errorList.push(result.message);
          this.invalidBranchName = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
        return;
       // this.router.navigate(['/customertypes']);

      },
        error => {
          console.log(error);
          this.errorList.push(error);
          this.invalidBranchName = true;
          this.isSuccessful = false;
          this.insertForm.controls['Name'].enable();
        }
      );

    } catch (e) {
      this.errorList.push(e.Message);
      this.invalidBranchName = true;
      this.isSuccessful = false;
      this.insertForm.controls['Name'].enable();
    }
    return;

  }




}
