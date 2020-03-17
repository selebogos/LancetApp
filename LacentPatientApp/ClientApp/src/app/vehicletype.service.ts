import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicletypeService {

  private baseUrllVehicleType: string = "/api/vehicletype/create";
  private baseUrllGetVehicleTypes: string = "/api/vehicletype/getvehicletypes";
  private baseUrllVehicleTypeEdit:string='/api/vehicletype/edit';
  private baseUrlVehicleTypeDetails :string = "/api/vehicletype/details/?id=";

  private  vehicleTypes=[];
  constructor(private http: HttpClient, private router: Router) {

  }

  public addVehicleType(name: string) {

    try {
      return this.http.post<any>(this.baseUrllVehicleType, { name }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

    
  }

  public getVehicleTypes(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      
      return this.http.get(this.baseUrllGetVehicleTypes , {headers});

    } catch (e) {
      console.log("Error:problem getting the vehicle types "+ e.Message);
      return e.Message;
    }
    
    
  }

  public updatVehicleType(name: string,id:number) {

    try {
      return this.http.post<any>(this.baseUrllVehicleTypeEdit, {name,id }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

    
  }

  public getVehicleTypeDetails(id:number){
    try{

      var  uri = this.baseUrlVehicleTypeDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });
       
    } catch(e){
      console.log("Error:problem getting vehicle type details "+ e.Message);
      return e.Message;
    }


  }

}
