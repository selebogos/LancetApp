import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricingdetailService {
  private baseUrlPricingDetails: string = "/api/pricingdetail/create";
  private baseUrlPricingDetailsEdit: string = "/api/pricingdetail/edit";
  private baseUrlGetPricingDetails: string = "/api/pricingdetail/getpricingdetails";
  private baseUrlGetPricingDetailsById: string = "/api/pricingdetail/GetPricingDetailsById/?id=";
  private baseUrlGetAmount: string = "/api/pricingdetail/getamount";
  private baseUrlPricingDelete :string = "/api/pricingdetail/delete/?id=";
  private pricingDetails = [];
  constructor(private http: HttpClient, private router: Router) {
  }

  public getPricingDetails()
  {
    try {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.get(this.baseUrlGetPricingDetails,{headers});

    } catch (e) {
      console.log("Error:problem getting the pricing details "+ e.Message);
      return e.Message;
    }

    return this.pricingDetails;
  }

  public getPricingDetailsById(id: number)
  {
    try{
      const  uri = this.baseUrlGetPricingDetailsById + id;
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.get(uri, { headers });
    } catch(e){
      console.log('Error:problem getting pricing details ' + e.Message);
      return e.Message;
    }
  }

  public getAmount(vehicleType:string,washType:string,vehicleRegistration:string)
  {
    try {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      var uri = this.baseUrlGetAmount + '/?vehicletype=' + vehicleType + '&washtype=' + washType + '&vehicleRegistration=' + vehicleRegistration;
      return this.http.get(uri , {headers});
    } catch (e) {
      console.log("Error:problem getting the price "+ e.Message);
      return e.Message;
    }
  }

  public addPricingDetails(Description:string,VehicleType:string,WashType: string,Amount:number) {

    try {
      return this.http.post<any>(this.baseUrlPricingDetails, { Description,VehicleType,WashType,Amount}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }

  public updatePricingDetails(Description:string,VehicleType:string,WashType: string,Amount:number,PricingDetailId:number) {

    try {
      return this.http.post<any>(this.baseUrlPricingDetailsEdit, { Description,VehicleType,WashType,Amount,PricingDetailId}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }

  public deletePricingItem(id:number){
    try{
      var  uri = this.baseUrlPricingDelete + id;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting discount details "+ e.Message);
      return e.Message;
    }
  }

}
