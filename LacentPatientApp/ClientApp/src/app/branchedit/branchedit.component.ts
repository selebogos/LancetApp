import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { BranchModel } from '../_models/BranchModel';
import { BranchService } from '../branch.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-branchedit',
  templateUrl: './branchedit.component.html',
  styleUrls: ['./branchedit.component.css']
})
export class BrancheditComponent implements OnInit {

    LoginStatus$: Observable<boolean>;
    Username$: Observable<string>;

    IsLoggedIn = false;
    Name: FormControl;
    insertForm: FormGroup;
    errorList: string[];
    successMessage;
    invalidBranch = false;
    isSuccessful = false;
    branches=[];
    branch: BranchModel;

    id: number;
    private sub: any;

    constructor(private register: RegisterService,private activeRoute: ActivatedRoute,
      private router: Router, private fb: FormBuilder,private branchService:BranchService,private activateUIService:ActivatUIService) {

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

     this.branchService.getBranchDetails(this.id).subscribe(

      data => {

        this.branch = data as any;

        this.Name.setValue(this.branch.name);
        console.log(this.branch);
      },
      error => {
        console.log('Error:Problem getting the branch details ' + error);

      });

    }


    onSave() {

      try {
        let details = this.insertForm.value;
        this.branchService.updatBranch(details.Name,this.id).subscribe(result => {

          if (result.message === "Successful") {
            this.router.navigate(["/branches"]);
            this.successMessage = result.message;
            this.invalidBranch = false;
            this.isSuccessful = true;
            this.insertForm.controls['Name'].disable();
          }
          else {
            this.errorList.push(result.message);
            this.invalidBranch = true;
            this.isSuccessful = false;
            this.insertForm.controls['Name'].enable();
          }
          return;
         // this.router.navigate(['/customertypes']);

        },
          error => {
            console.log(error);
            this.errorList.push(error);
            this.invalidBranch = true;
            this.isSuccessful = false;
            this.insertForm.controls['Name'].enable();
          }
        );

      } catch (e) {
        this.errorList.push(e.Message);
        this.invalidBranch = true;
        this.isSuccessful = false;
        this.insertForm.controls['Name'].enable();
      }
      return;

    }


}
