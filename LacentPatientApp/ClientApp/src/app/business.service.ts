import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private baseUrllGetBusinesses: string = "/api/BusinessLoyaltyProgram/getbusiness";
  private baseUrlBusinessSearch :string = "/api/BusinessLoyaltyProgram/search/?business=";
  private  vehicleTypes=[];
  constructor(private http: HttpClient, private router: Router) {
  }
  public getBusinesses(){
    try {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.get(this.baseUrllGetBusinesses , {headers});
    } catch (e) {
      console.log("Error:problem getting the businesses "+ e.Message);
      return e.Message;
    }
  }
  public search(name: string){

    try{
      var  uri = this.baseUrlBusinessSearch + name;
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.get(uri, { headers }).pipe(debounceTime(500));
    } catch(e){
      console.log("Error:problem searching for car wash "+ e.Message);
      return e.Message;
    }

  }
}
