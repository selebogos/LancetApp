import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrllNoOfOrders: string = "/api/dashboard/GetNoOrders";
  private baseUrllNoOfOrdersThisMonth: string = "/api/dashboard/GetNoOrdersThisMonth";
  private baseUrllTodaySaleAmount: string = "/api/dashboard/GetSalesAmountToday";
  private baseUrlSalesAmountThisMonth: string = "/api/dashboard/GetSalesAmountThisMonth";
  constructor(private http: HttpClient, private router: Router) {


  }

  public getNoOrdersToday(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrllNoOfOrders , {headers});

    } catch (e) {
      console.log("Error:problem getting the customer types "+ e.Message);
      return e.Message;
    }
  }

  public getNoOrdersThisMonth(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrllNoOfOrdersThisMonth , {headers});

    } catch (e) {
      console.log("Error:problem getting the customer types "+ e.Message);
      return e.Message;
    }
  }

  public getTodaySaleAmount(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrllTodaySaleAmount , {headers});

    } catch (e) {
      console.log("Error:problem getting the customer types "+ e.Message);
      return e.Message;
    }
  }

  public getThisMonthSaleAmount(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrlSalesAmountThisMonth , {headers});

    } catch (e) {
      console.log("Error:problem getting the customer types "+ e.Message);
      return e.Message;
    }
  }

}
