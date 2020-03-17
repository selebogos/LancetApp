import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrlReport: string = "/api/report/download";
  constructor(private http: HttpClient,private router:Router) { }

  download(email:string,fromDate:Date,toDate:Date){

    try {

      return this.http.post<any>(this.baseUrlReport, { email,fromDate,toDate }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }
}
