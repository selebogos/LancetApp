import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatUIService } from '../activat-ui.service';


@Component({
  selector: 'app-moneyintills',
  templateUrl: './moneyintills.component.html',
  styleUrls: ['./moneyintills.component.css']
})
export class MoneyintillsComponent implements AfterViewInit, OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  Token$: Observable<string>;
  loginData: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;

  constructor(private renderer: Renderer , private register: RegisterService,
    private router: Router,private activateUIService:ActivatUIService) {

   }
  IsLoggedIn = false;


  ngOnInit() {
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.LoginStatus$.subscribe((data: boolean) =>
    {
        console.log('am i logged in ', data);
        this.IsLoggedIn = data;
    });

    if (!this.IsLoggedIn){
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
      order: [[2, 'asc']],
      info: false,
      scrollY: '450px',
      scrollCollapse: true,
      processing: true,
      serverSide: true,
      lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'All']],

      ajax: {
        'url': '/api/pos/getalltills',
        'type': "GET",
        'beforeSend': function (xhr) {

          let token = localStorage.getItem('jwt');
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        },
        'error': function(reason) {
          console.log("Error occurred !");
        }
      },
      columns: [
        {
          title: 'Branch',
          data: 'Branch'
        },
      /*{
        title: 'Total Amount(ZAR)',
        render: function (data: any, type: any, full: any) {
          let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'ZAR',
          });
          return '<b>' + formatter.format(full.TotalAmount) + '</b>';

        }
    }
      ,*/
      {
        title: 'Date',
        data: 'DateToString'
      },
      {
        title: 'View',
        render: function (data: any, type: any, full: any)
        {
          return '<button type="button" class="btn btn-warning" view-pos-id="' + full.POSId + '">View</button>';
        }
      }
    ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("view-pos-id")) {
        this.router.navigate(["/tilldetails/" + event.target.getAttribute("view-pos-id")]);
      }
    });
  }

}
