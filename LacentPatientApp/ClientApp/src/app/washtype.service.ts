import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WashtypeService {

  private baseUrllWashType:string = '/api/washtype/create';
  private baseUrllWashTypeEdit:string='/api/washtype/edit';
  private baseUrllGetWashTypes:string = '/api/washtype/getwashtypes';
  private baseUrlWashTypeDetails :string = "/api/washtype/details/?id=";
  private WashTypes = [];

  constructor(private http: HttpClient, private router: Router) {


  }

  public addWashType(name: string) {

    try {
      return this.http.post<any>(this.baseUrllWashType, { name }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

    
  }

  public getWashTypes()
  {

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrllGetWashTypes , {headers});

    } catch (e) {
      console.log("Error:problem getting the wash types "+ e.Message);
      return e.Message;
    }
    
    
  }

  public updateWashType(name: string,id:number) {

    try {
      return this.http.post<any>(this.baseUrllWashTypeEdit, {name,id }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

    
  }

  public getWashTypeDetails(id:number){
    try{

      var  uri = this.baseUrlWashTypeDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });
       
    } catch(e){
      console.log("Error:problem getting wash type details "+ e.Message);
      return e.Message;
    }


  }



}
