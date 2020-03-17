import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrllBranch: string = "/api/branch/create";
  private baseUrllGetBranches: string = "/api/branch/getbranches";
  private baseUrllBranchEdit:string='/api/branch/edit';
  private baseUrlBranchDetails :string = "/api/branch/details/?id=";

  private  vehicleTypes=[];
  constructor(private http: HttpClient, private router: Router) {

  }

  public addBranch(name: string) {

    try {
      return this.http.post<any>(this.baseUrllBranch, { name }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public getBranches(){

    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(this.baseUrllGetBranches , {headers});

    } catch (e) {
      console.log("Error:problem getting the branch "+ e.Message);
      return e.Message;
    }


  }

  public updatBranch(name: string,id:number) {

    try {
      return this.http.post<any>(this.baseUrllBranchEdit, {name,id }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }

  public getBranchDetails(id:number){
    try{

      var  uri = this.baseUrlBranchDetails + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting branch details "+ e.Message);
      return e.Message;
    }
  }

}
