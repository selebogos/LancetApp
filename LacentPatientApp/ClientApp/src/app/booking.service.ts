import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrllAddBooking: string = "/api/Booking/create";
  private baseUrlBusinessSearch :string = "/api/BusinessLoyaltyProgram/search/?business=";
  private baseUrlGetBookingDetails :string = "/api/Booking/details/?id=";
  private  vehicleTypes=[];
  constructor(private http: HttpClient, private router: Router) {
  }
  public create(businessName:string,date:Date,time:string,contact:string,scheduler:string){
    try {

      return this.http.post<any>(this.baseUrllAddBooking, { businessName,date,time,contact,scheduler}).pipe(
        map(result => {
          return result;
        }, error => {
          return error;
        }));
    } catch (e) {
    }
  }
  public getBookingDetails(id:number){
    try{

      var  uri = this.baseUrlGetBookingDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting booking details "+ e.Message);
      return e.Message;
    }
  }
}
