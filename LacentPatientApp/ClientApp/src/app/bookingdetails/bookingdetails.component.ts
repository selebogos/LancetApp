import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchModel } from '../_models/BranchModel';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { RegisterService } from '../register.service';
import { CustomerService } from '../customer.service';
import { BookingModel } from '../_models/BookingModel';
import { BookingService } from '../booking.service';
import { ActivatUIService } from '../activat-ui.service';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css']
})
export class BookingdetailsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  IsLoggedIn = false;
  Username$: Observable<string>;
  customerTypes =  [] as any;
  Booking: BookingModel;
  insertForm: FormGroup;

  errorList: string[];
  successMessage;
  invalidBranch = false;
  isSuccessful = false;
  selectedOption: FormControl;

  id: number;
  private sub: any;
  constructor(private activeRoute: ActivatedRoute,private bookingService:BookingService ,
    private register: RegisterService, private customerService: CustomerService,
     private router: Router, private fb: FormBuilder,private activateUIService:ActivatUIService) {

    this.Booking = new BookingModel();
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

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
   this.activateUIService.initToggle();
    this.bookingService.getBookingDetails(this.id).subscribe(

      data => {
        this.Booking = data as any;

        console.log(this.Booking);
      },
      error => {
        console.log('Error:Problem getting the branch details ' + error);

    });

  }


}
