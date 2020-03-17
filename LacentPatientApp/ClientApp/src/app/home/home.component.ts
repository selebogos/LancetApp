import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  constructor(private register: RegisterService,private router:Router,private dashboardService:DashboardService) { }
  IsLoggedIn=false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;
  todayOrders:number;
  thisMonthOrders:number;
  thisMonthSalesAmount:string;
  todaySalesAmount:string;

  ngOnInit() {

    this.initToggle();
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
    /*
    this.dashboardService.getNoOrdersToday().subscribe(

      data => {

        this.todayOrders = data as any;



      },
      error => {

        console.log('Error:Problem getting the pricing details ' + error);

    });

    this.dashboardService.getNoOrdersThisMonth().subscribe(

      data => {

        this.thisMonthOrders = data as any;



      },
      error => {

        console.log('Error:Problem getting the pricing details ' + error);

    });

    this.dashboardService.getTodaySaleAmount().subscribe(

      data => {

        let amount = data as any;

        let formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'ZAR',
        });
        //let a=parseFloat(this.POS.amount1.toString());
        const a1=parseFloat(amount.toString());
        this.todaySalesAmount=formatter.format(a1);

      },
      error => {

        console.log('Error:Problem getting the pricing details ' + error);

    });

    this.dashboardService.getThisMonthSaleAmount().subscribe(

      data => {

        this.thisMonthSalesAmount = data as any;

        let amount = data as any;

        let formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'ZAR',
        });
        //let a=parseFloat(this.POS.amount1.toString());
        const a1=parseFloat(amount.toString());
        this.thisMonthSalesAmount=formatter.format(a1);

      },
      error => {

        console.log('Error:Problem getting the pricing details ' + error);

    });*/

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
      columns: [
        {
          title: 'FullName',
          data: 'FullName'
        },

    ]
    };
  }

  public onLogout() {
    this.register.logout();
  }
  public initToggle(){
    let element = document.getElementById('accordionSidebar');
      if ($(window).width() < 768) {
          if (element !== null && element !== undefined) {
            const name = 'toggled';
            const arr = element.className.split(' ');
            if (arr.indexOf(name) == -1) {
              element.className += " " + name;
            }else{
            }
          }
          else{
            element.className = element.className.replace(/\btoggled\b/g, '');
          }
      }
      else {
          element.className = element.className.replace(/\btoggled\b/g, '');
      }
  }

}
