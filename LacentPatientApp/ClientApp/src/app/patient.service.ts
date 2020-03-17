import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientViewModel } from './_models/patientModel';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrllPatient: string = "/api/patient/add";
  private baseUrlPatientDetails: string = "/api/patient/";
  private baseUrllPatientEdit: string = "/api/patient/update/";
  private baseUrllPatientSearch: string = "/api/patient/search/?name=";
  constructor(private http: HttpClient, private router: Router) {

  }

  public addPatient(patient: PatientViewModel) {

try {
      return this.http.post<any>(this.baseUrllPatient,
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

  public getPatientDetails(id:string){
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
  public search(name: string){

    try{

      var  uri = this.baseUrllPatientSearch + name;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers }).pipe(debounceTime(500));

    } catch(e){
      console.log("Error:problem searching for patient "+ e.Message);
      return e.Message;
    }

  }

}
