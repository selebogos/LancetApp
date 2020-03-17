import { Injectable } from "@angular/core";
import { CountryModel } from './CountryModel';
import { AddressModel } from './AddressModel';

@Injectable({
    providedIn:'root'
})

export class PatientViewModel {

    public  Id : string;
    public fullName:string;
    public  addedById :string;
    public  createdBy :string;
    public email:string;
    public address:string;
    public addressId:string;
}
