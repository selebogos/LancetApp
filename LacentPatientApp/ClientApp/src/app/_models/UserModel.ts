import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class UserModel {

    public  id : number;
    public isActive : boolean;
    public  firstname :string;
    public  lastname :string;
    public  email :string;
    public  password :string;
    public  dateAdded :string;
    public  userRole :string;
    public branch:string;
    public postalCode:string;
    public street:string;
    public city:string;
    public suburb:string;
    public businessName:string;

}
