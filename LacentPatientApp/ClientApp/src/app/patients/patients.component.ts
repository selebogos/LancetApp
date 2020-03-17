import { Component, OnInit, Renderer } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { ActivatUIService } from '../activat-ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  Token$: Observable<string>;
  loginData:string='';
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;

  constructor(private renderer: Renderer ,private register: RegisterService,
    private router:Router,private activateUIService:ActivatUIService) {


   }
  IsLoggedIn=false;
  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.LoginStatus$.subscribe((data: boolean) =>
    {
        console.log('am i logged in ', data);
        this.IsLoggedIn=data;
    });

    if(!this.IsLoggedIn){
      this.router.navigate(['/login']);
    }
    this.activateUIService.initToggle();
    this.Token$ = this.register.loginData;
    this.Token$.subscribe((data: string) =>
    {
        console.log('my token', data);
        this.loginData = data;
    });

    this.dtOptions = {
      //filter: true,
      pagingType: 'simple_numbers',
      orderClasses: false,
      order: [[0, 'asc']],
      info: false,
      scrollY: '450px',
      scrollCollapse: true,
      processing: true,
      serverSide: true,
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'All']],
      //ajax: '/api/customer/getall',
      ajax: {
        'url': '/api/patient/getall',
        'type': "GET",
        'beforeSend': function (xhr) {

          let token = localStorage.getItem('jwt');
           xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        },
        'error': function(reason) {
          console.log("Error occurred !");
        }
      },
      columns: [{
        title: 'Full Name',
        data: 'FullName'
      },
      {
        title: 'View',
        render: function (data: any, type: any, full: any) {
          return '<button type="button" class="btn btn-warning" view-patient-id="' + full.Id + '">View</button>';
        }
      }
    ]
    };



  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("view-patient-id")) {
        this.router.navigate(["/patientdetails/" + event.target.getAttribute("view-patient-id")]);
      }
    });
  }

  goToCustomerDetails(id:number) {
    this.router.navigate(['/patientdetails', id]);
  }


}
