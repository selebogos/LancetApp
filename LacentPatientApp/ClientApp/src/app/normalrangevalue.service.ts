import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NormalrangevalueService {

  private baseUrllGetNormalRangeValue: string = "/api/normalrange/getall";
  constructor(private http: HttpClient, private router: Router) {
  }
  public getNormalRangeValues(){

    try {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.get(this.baseUrllGetNormalRangeValue , {headers});
    } catch (e) {
      console.log("Error:problem getting the test results "+ e.Message);
      return e.Message;
    }
  }
}
