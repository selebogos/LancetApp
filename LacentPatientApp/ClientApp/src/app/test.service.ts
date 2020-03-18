import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { TestModel } from './_models/TestModel';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  private baseUrllGetTestResults: string = "/api/testresult/getall";
  private baseUrllAddTest: string = "/api/test/add";
  private baseUrllGetTest: string = "/api/test/";
  private baseUrllTestEdit:string="/api/test/update/";
  constructor(private http: HttpClient, private router: Router) {
  }
  public getTestResults(){

    try {
      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');
      return this.http.get(this.baseUrllGetTestResults , {headers});
    } catch (e) {
      console.log("Error:problem getting the test results "+ e.Message);
      return e.Message;
    }

  }
  public addTest(test: TestModel) {
    debugger;
    try {
      return this.http.post<any>(this.baseUrllAddTest, test).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }
  public getTestDetails(id:string){
    try{

      var  uri = this.baseUrllGetTest + id;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting test details "+ e.Message);
      return e.Message;
    }
  }
  public updateTestDetails(test:TestModel) {

    try {
      var  uri = this.baseUrllTestEdit + test.id;
      return this.http.put<any>(uri, test).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }


  }
}
