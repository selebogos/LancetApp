import { Injectable } from "@angular/core";
import { CountryModel } from './CountryModel';

@Injectable({
    providedIn:'root'
})

export class AddressModel {

    public  id : string;
    public  CountryId :number;
    public  Country :CountryModel;
    public Province:string;
    public Code:number;
    public Street:string;
    public Town:string;
}
