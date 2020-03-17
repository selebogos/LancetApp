import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentmethodService {

  private baseUrllVehicleType: string = "/api/paymentmethod/create";

  private baseUrlPayMntMethodList: string = "/api/paymentmethod/getpaymentmethods";

  constructor(private http: HttpClient, private router: Router) {


  }

  public addPaymentMethodType(name: string) {

    try {
      return this.http.post<any>(this.baseUrllVehicleType, { name }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

    
  }

  public getPaymentMethods(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrlPayMntMethodList , {headers});

    } catch (e) {
      console.log("Error:problem getting the payment methods "+ e.Message);
      return e.Message;
    }

  }

}
