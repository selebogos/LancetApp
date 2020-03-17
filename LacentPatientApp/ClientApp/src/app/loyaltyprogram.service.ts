import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyprogramService {

  private baseUrllAddLoyaltyProgram: string = "/api/businessloyaltyprogram/edit";
  private baseUrlGetDetails :string = "/api/businessloyaltyprogram/getdetails";

  private error:string="";
  
  constructor(private http: HttpClient, private router: Router) {


  }


  public getDetails(){
    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrlGetDetails , {headers});

    } catch (e) {
      console.log("Error:problem getting the loyalty program details "+ e.Message);
      return e.Message;
    }
  }

  public saveDetails(Percentage:number,NoOfWashes:number){

    try {

      return this.http.post<any>(this.baseUrllAddLoyaltyProgram, { Percentage,NoOfWashes}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {
   
      console.log("Error  updating information "+e.Message);
      return e;
    }

  }

}
