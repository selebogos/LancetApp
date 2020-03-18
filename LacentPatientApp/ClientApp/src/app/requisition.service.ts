import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientViewModel } from './_models/patientModel';
import { RequisitionModel } from './_models/RequisitionModel';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  private baseUrllRequisition: string = "/api/requisition/add";
  private baseUrlPatientDetails: string = "/api/requisition/";
  private baseUrllPatientEdit: string = "/api/requisition/update/";
  private baseUrllRequisitionSearch: string = "/api/requisition/search?requisitionNumber=";
  constructor(private http: HttpClient, private router: Router) {
  }

  public addRequisition(patient: RequisitionModel) {

try {
      return this.http.post<any>(this.baseUrllRequisition,
        patient
       ).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }
  }

  public getRequisitionDetails(id:string){
    try{

      var  uri = this.baseUrlPatientDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting customer details "+ e.Message);
      return e.Message;
    }
  }
  public updatePatientDetails(patient:PatientViewModel) {

    try {
      var  uri = this.baseUrllPatientEdit + patient.Id;
      return this.http.put<any>(uri, patient).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public search(requisitionNumber: number){

    try{
      debugger;
      var  uri = this.baseUrllRequisitionSearch + requisitionNumber;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.get(uri, { headers }).pipe(debounceTime(500));

    } catch(e){
      console.log("Error:problem searching for requisition "+ e.Message);
      return e.Message;
    }

  }

}
