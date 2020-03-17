import { Injectable } from "@angular/core";



@Injectable({
    providedIn:'root'
})

export class CustomerModel{

    public customerId:number;

    public  customerTypeId:number;

    public  customerType:string;

    public  contact :string;

    public  fullName:string;

    public  description :string;

    public  vehicleRegistration:string;

    public  imageUrl :string;

    public  make :string;

    public  branch:string;

}
