import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrllCustomerType: string = "/api/customertype/create";

  private baseUrlCustomer: string = "/api/customer/create";
  private baseUrllCustomerEdit: string = "/api/customer/edit";
  private baseUrlCustomerTypesList: string = "/api/customer/getcustomertypes";
  private baseUrlCustomerSearch :string = "/api/customer/search/?customer=";
  private baseUrlCustomerDetails :string = "/api/customer/details/?id=";

  private baseUrlCustomerTypeDetails :string = "/api/customertype/details/?id=";
  private baseUrllCustomerTypeEdit: string = "/api/customertype/edit";
  //private baseUrlCustomerType :string = "/api/customertype/details/?id=";

  private  customerTypes=[];
  private customerDetails = new Observable<any[]>();
  private error:string="";

  constructor(private http: HttpClient, private router: Router) {


  }

  public addCustomerType(name: string) {

    try {
      return this.http.post<any>(this.baseUrllCustomerType, { name }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public addCustomer(FullName:string,CustomerType:string,VehicleRegistration: string,
    make:string,Description:string,Contact:string,Branch:string) {

    try {
      return this.http.post<any>(this.baseUrlCustomer, { FullName,CustomerType,VehicleRegistration,make,Description,Contact,Branch}).pipe(
        map(result => {
          return result;
        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public updateCustomer(FullName:string,CustomerId:number,CustomerType:string,
    VehicleRegistration: string,make:string,Description:string,Contact:string,Branch:string) {

    try {
      return this.http.post<any>(this.baseUrllCustomerEdit, {FullName, CustomerId,CustomerType,
        VehicleRegistration,make,Description,Contact,Branch}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public updateCustomerType(name: string,id:number) {

    try {
      return this.http.post<any>(this.baseUrllCustomerTypeEdit, {name,id }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public getCustomerTypes(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(this.baseUrlCustomerTypesList , {headers});

    } catch (e) {
      console.log("Error:problem getting the customer types "+ e.Message);
      return e.Message;
    }
  }

  public search(name: string){

    try{

      var  uri = this.baseUrlCustomerSearch + name;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers }).pipe(debounceTime(500));

    } catch(e){
      console.log("Error:problem searching for customers "+ e.Message);
      return e.Message;
    }

  }

  public getCustomerDetails(id:number){
    try{

      var  uri = this.baseUrlCustomerDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting customer details "+ e.Message);
      return e.Message;
    }


  }


  public getCustomerTypeDetails(id:number){
    try{

      var  uri = this.baseUrlCustomerTypeDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting customer type details "+ e.Message);
      return e.Message;
    }


  }

}

