import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  private baseUrllAddTilll: string = "/api/pos/createtill";
  private baseUrlTillEdit: string = "/api/pos/edittill";
  private baseUrlCashupEdit: string = "/api/pos/editcashup";
  private baseUrlCashOnHandEdit: string = "/api/pos/editcashonhand";
  private baseUrlDailyTotalSales :string = "/api/pos/GetDailyTotalSale";
  private baseUrlTillAmount :string = "/api/pos/GetTillAmount";
  private baseUrlTillDetails :string = "/api/pos/GetTillDetails/?id=";
  private baseUrlCashupDetails :string = "/api/pos/GetCashupDetails/?id=";
  private baseUrlCashonhandDetails :string = "/api/pos/GetCashOnHandDetails/?id=";
  private baseUrlNoOfCardPayments :string = "/api/pos/GetNoOfCardPayments";
  private baseUrllAddCashup: string = "/api/pos/createcashup";
  private baseUrllAddCashOnhand: string = "/api/pos/createcashonhand";
  private error:string="";

  constructor(private http: HttpClient, private router: Router) {


  }

  public addTill(Amount1:number,Amount2:number,Amount3:number,Amount4:number,Amount5:number,
    Amount6:number,Amount7:number,Amount8:number,Branch:string){

    try {

      return this.http.post<any>(this.baseUrllAddTilll, { Amount1,Amount2,Amount3,Amount4,Amount5,
        Amount6,Amount7,Amount8,Branch}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

      console.log("Error adding till information "+e.Message);
      return e;
    }
  }

  public addcashup(Amount1:number,Amount2:number,Amount3:number,Amount4:number,
    Amount5:number,Amount6:number,Amount7:number,Amount8:number,Note:string,Branch:string){

    try {

      return this.http.post<any>(this.baseUrllAddCashup, { Amount1,Amount2,Amount3,Amount4,Amount5,
        Amount6,Amount7,Amount8,Note,Branch}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

      console.log("Error adding till information "+e.Message);
      return e;
    }
  }

  public addCashOnHand(Amount1:number,Amount2:number,Amount3:number,Amount4:number,Amount5:number,
    Amount6:number,Amount7:number,Note:string,Branch:string){

    try {

      return this.http.post<any>(this.baseUrllAddCashOnhand, { Amount1,Amount2,Amount3,Amount4,Amount5,
        Amount6,Amount7,Note,Branch}).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

      console.log("Error adding till information "+e.Message);
      return e;
    }
  }

  public updateTill(Amount1:number,Amount2:number,Amount3:number,Amount4:number,Amount5:number,
    Amount6:number,Amount7:number,Amount8:number,POSId:number) {

    try {

      return this.http.post(this.baseUrlTillEdit,
          {
            Amount1,Amount2,Amount3,
            Amount4,Amount5,Amount6
            ,Amount7,Amount8,POSId

          }).pipe(
              map(result => {

                return result;

              }, error => {
                  return error;
        }));

    } catch (e) {
      console.log("Error updating till "+e.Message);
      return e;
    }


  }


  public updateCashOnHand(Amount1:number,Amount2:number,Amount3:number,Amount4:number,Amount5:number,
    Amount6:number,Amount7:number,Amount8:number,note:string,POSId:number) {

    try {

      return this.http.post(this.baseUrlCashOnHandEdit,
          {
            Amount1,Amount2,Amount3,
            Amount4,Amount5,Amount6
            ,Amount7,Amount8,note,POSId

          }).pipe(
              map(result => {

                return result;

              }, error => {
                  return error;
        }));

    } catch (e) {
      console.log("Error updating till "+e.Message);
      return e;
    }


  }
  public updateCashup(Amount1:number,Amount2:number,Amount3:number,Amount4:number,Amount5:number,
    Amount6:number,Amount7:number,Amount8:number,note:string,POSId:number) {

    try {

      return this.http.post(this.baseUrlCashupEdit,
          {
            Amount1,Amount2,Amount3,
            Amount4,Amount5,Amount6
            ,Amount7,Amount8,note,POSId

          }).pipe(
              map(result => {

                return result;

              }, error => {
                  return error;
        }));

    } catch (e) {
      console.log("Error updating till "+e.Message);
      return e;
    }


  }

  public getDailyTotalSale(){
    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(this.baseUrlDailyTotalSales , {headers});

    } catch (e) {
      console.log("Error:problem getting today's total sales "+ e.Message);
      return e.Message;
    }
  }

  public getTillAmount(){
    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(this.baseUrlTillAmount , {headers});

    } catch (e) {
      console.log("Error:problem getting the yesterday's till amount "+ e.Message);
      return e.Message;
    }
  }

  public getNoOfCardPayments(){
    try {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(this.baseUrlNoOfCardPayments , {headers});

    } catch (e) {
      console.log("Error:problem getting the no of card payments "+ e.Message);
      return e.Message;
    }
  }


  public getTillDetails(id: number){
    try{

      const  uri = this.baseUrlTillDetails + id;

      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(uri, { headers });

    } catch(e){
      console.log('Error:problem getting discount details ' + e.Message);
      return e.Message;
    }
  }

  public getCashupDetails(id: number){
    try{

      const  uri = this.baseUrlCashupDetails + id;

      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(uri, { headers });

    } catch(e){
      console.log('Error:problem getting discount details ' + e.Message);
      return e.Message;
    }
  }
  public getCashOnHandDetails(id: number){
    try{

      const  uri = this.baseUrlCashonhandDetails + id;

      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.get(uri, { headers });

    } catch(e){
      console.log('Error:problem getting discount details ' + e.Message);
      return e.Message;
    }
  }


}
