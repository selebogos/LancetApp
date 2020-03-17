import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { map, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleTypeModel } from './_models/VehicleTypeModel';
import { CustomerTypeModel } from './_models/CustomerTypeModel';
import { WashTypeModel } from './_models/WashTypeModel';
import { BranchModel } from './_models/BranchModel';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private baseUrllOrderCreate: string = "/api/discount/create";
  private baseUrllDiscountEdit: string = "/api/discount/edit";
  private baseUrlCustomer: string = "/api/customer/create";
  private baseUrllCustomerEdit: string = "/api/customer/edit";
  private baseUrlCustomerTypesList: string = "/api/customer/getcustomertypes";
  private baseUrlCustomerSearch :string = "/api/customer/search/?customer=";
  private baseUrlDiscountDetails :string = "/api/discount/details/?id=";
  private baseUrlDiscountDelete :string = "/api/discount/delete/?id=";
  private error:string="";
  constructor(private http: HttpClient, private router: Router) {
  }

  public createDiscount(Description:string,Percentage:number,WashTypes:WashTypeModel[],VehicleTypes:VehicleTypeModel[],
    CustomerTypes:CustomerTypeModel[],Day:number,OnWhichDate:Date,ToWhichDate:Date) {

    try {
      return this.http.post(this.baseUrllOrderCreate,
          {
            Description,Day,WashTypes,
            VehicleTypes,Percentage,CustomerTypes
            ,OnWhichDate,ToWhichDate
          }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {
      console.log("Error creating a discount item "+e.Message);
      return e;
    }
  }

  public updateDiscount(Description:string,Percentage:number,WashTypes:WashTypeModel[],VehicleTypes:VehicleTypeModel[],
    CustomerTypes:CustomerTypeModel[],Day:number,OnWhichDate:Date,ToWhichDate:Date,
    Disabled:boolean,DiscountId:number) {

    try {

      return this.http.post(this.baseUrllDiscountEdit,
          {
            Description,Day,WashTypes,
            VehicleTypes,Percentage,CustomerTypes
            ,OnWhichDate,ToWhichDate,
            DiscountId,
            Disabled,

          }).pipe(
              map(result => {

                return result;

              }, error => {
                  return error;
        }));

    } catch (e) {
      console.log("Error creating a discount item "+e.Message);
      return e;
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
  public getDiscountDetails(id:number){

    try{

      var  uri = this.baseUrlDiscountDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting discount details "+ e.Message);
      return e.Message;
    }
  }
  public deleteDiscount(id:number){
    try{

      var  uri = this.baseUrlDiscountDelete + id;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting discount details "+ e.Message);
      return e.Message;
    }
  }
}
