import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class CountryModel {

    public  id : string;
    public  name :string;
    public  code :string;
}
