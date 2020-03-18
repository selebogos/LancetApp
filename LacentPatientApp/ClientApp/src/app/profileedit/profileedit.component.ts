import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../_models/UserModel';
import { ActivatUIService } from '../activat-ui.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpEventType, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css']
})
export class ProfileeditComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  UserRole: FormControl;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  Email: FormControl;
  LastName: FormControl;
  FirstName: FormControl;
  Password: FormControl;
  RepeatPassword: FormControl;
  BusinessName:FormControl;
  City:FormControl;
  Street:FormControl;
  PostalCode:FormControl;
  Suburb:FormControl;
  insertForm: FormGroup;
  errorList: string[];
  successMessage;
  invalidUser = false;
  isSuccessful = false;
  selectedOption:FormControl;
  User:UserModel;
  id: number;
  private sub: any;
  IsRightUser:boolean;
  private baseUrllUpload:string="/api/account/uploadfile/";
  public response: {dbPath: ''};

  constructor(private activeRoute: ActivatedRoute,private register: RegisterService,
    private http: HttpClient,
    private customerService:CustomerService,private activateUIService:ActivatUIService,private SpinnerService: NgxSpinnerService,
    private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.LoginStatus$.subscribe((data: boolean) =>
    {
        console.log('am i logged in ', data);
        this.IsLoggedIn = data;
    });

    if(!this.IsLoggedIn){
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();
    //this.customerTypes = this.customerService.getCustomerTypes();
    this.User = new UserModel();
    this.errorList = [];

    this.UserRole = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]);
    this.FirstName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.LastName = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.Email = new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]);
    this.BusinessName=new FormControl();
    this.Street=new FormControl();
    this.City=new FormControl();
    this.PostalCode=new FormControl();
    this.Suburb=new FormControl();

    this.insertForm = this.fb.group({
      "Email": this.Email,
      "UserRole": this.UserRole,
      "FirstName": this.FirstName,
      "LastName": this.LastName,
      "BusinessName":this.BusinessName,
      "Street":this.Street,
      "City":this.City,
      "PostalCode":this.PostalCode,
      "Suburb":this.Suburb,
    });

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });



  }
  public uploadFinished = (event) => {
    this.response = event;
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.baseUrllUpload, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
    }

  onSave() {

    try {
      this.SpinnerService.show();
      this.errorList=[];
      this.invalidUser=false;
      let details = this.insertForm.value;
      if(details.Email===null || details.Email===undefined || details.Email==="" || details.Email===" "){
        this.SpinnerService.hide();
        this.invalidUser=true;
        this.errorList.push("Please provide the email");
        return;
      }
      debugger;
      this.register.updateProfileDetails(details.UserRole,details.FirstName,details.LastName,details.Email,
        details.Password,details.BusinessName,details.Street,details.City,details.Suburb,details.PostalCode).subscribe(result => {
          this.SpinnerService.hide();
        if (result.message === "Successful") {
          this.router.navigate(["/profile"]);
        }
        else {
          this.errorList.push(result.message);
          this.invalidUser = true;
          this.isSuccessful = false;

          this.insertForm.controls['UserRole'].enable();
          this.insertForm.controls['FirstName'].enable();
          this.insertForm.controls['LastName'].enable();
          this.insertForm.controls['Password'].enable();
          this.insertForm.controls['RepeatPassword'].enable();

        }
        return;


      },
        error => {
          this.SpinnerService.hide();
          console.log(error);

          for(let i=0;i<error.error.value.length;i++){
            this.errorList.push(error.error.value[i]);
          }

          this.invalidUser = true;
          this.isSuccessful = false;

        }
      );

    } catch (e) {
      this.SpinnerService.hide();
      this.errorList.push(e.Message);
      this.invalidUser = true;
      this.isSuccessful = false;

    }
    return;
  }
}

