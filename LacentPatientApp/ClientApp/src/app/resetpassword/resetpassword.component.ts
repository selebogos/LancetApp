import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  insertForm:FormGroup;
  Password:FormControl;
  ConfirmPassword:FormControl;
  returnUrl:string;
  ErrorMessage:string;
  invalidLogin:boolean;
  token:string;
  private sub: any;
  constructor(private register:RegisterService,private router:Router,private route:ActivatedRoute,private fb:FormBuilder) {
  }

  ngOnInit() {
    this.ConfirmPassword = new FormControl('', [Validators.required,Validators.maxLength(15), Validators.minLength(2)]);
    this.Password = new FormControl('', [Validators.required,Validators.maxLength(15), Validators.minLength(2)]);
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.insertForm=this.fb.group({
      "ConfirmPassword":this.ConfirmPassword,
      "Password":this.Password
    });
    this.sub = this.route.params.subscribe(params => {
      this.token = params.data; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
  }

  onSubmit(){
    this.invalidLogin=false;
    this.ErrorMessage="";
    let userlogin=this.insertForm.value;
    if(this.ConfirmPassword.value!==this.Password.value)
    {
      this.invalidLogin=true;
      this.ErrorMessage="Please ensure that the passwords are the same!"
      return;
    }
    if(userlogin.ConfirmPassword==="" || userlogin.ConfirmPassword===" " || userlogin.ConfirmPassword===undefined)
    {
      this.invalidLogin=true;
      this.ErrorMessage="Please ensure that the passwords are the same!"
      return;
    }
    if(userlogin.Password==="" || userlogin.Password===" " || userlogin.Password===undefined)
    {
      this.invalidLogin=true;
      this.ErrorMessage="Please ensure that the passwords are the same!"
      return;
    }
    this.register.reset(userlogin.ConfirmPassword,userlogin.Password,this.token).subscribe(result=>{
      if(result.message!==undefined || result!==null)
      {
        this.router.navigate(['/passwordresetsuccess']);
      }
      else
      {
        this.invalidLogin=true;
        for(var i=0;i<result.errorList.length;i++){
          console.log(result.errorList[i]);
          this.ErrorMessage=result.errorList[i];
        }
      }
    },
    error=>{
      this.invalidLogin=true;
      this.ErrorMessage="Invalid login details provided,please try again";
      console.log(this.ErrorMessage);
      return;
    });

  }

}
