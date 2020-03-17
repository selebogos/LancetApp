import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrllOrderCreate: string = "/api/order/create";
  private baseUrlOrderDetails :string = "/api/order/details/?id=";
  private baseUrllOrderEdit: string = "/api/order/edit";
  private error:string="";

  constructor(private http: HttpClient, private router: Router) {


  }

  public createOrder(orderBelongsTo:string,VehicleRegistration:string,VehicleType:string,WashType:string,PaymentMethod:string,Branch:string) {

    try {

      return this.http.post<any>(this.baseUrllOrderCreate, { orderBelongsTo,VehicleRegistration,
        VehicleType,WashType,PaymentMethod,Branch }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {
      console.log("Error creating an order "+e.Message);
      return e;
    }


  }

  public updateOrer(orderBelongsTo:string,OrderId:number,VehicleRegistration:string,VehicleType:string,WashType:string,PaymentMethod:string) {

    try {
      return this.http.post<any>(this.baseUrllOrderEdit, {orderBelongsTo, OrderId,VehicleRegistration,VehicleType,WashType,PaymentMethod}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public getOrderDetails(id:number){
    try{

      var  uri = this.baseUrlOrderDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting order details "+ e.Message);
      return e.Message;
    }


  }

}
