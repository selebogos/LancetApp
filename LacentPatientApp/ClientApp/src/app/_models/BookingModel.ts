import { Injectable } from "@angular/core";



@Injectable({
    providedIn:'root'
})

export class BookingModel{
    public  Id:number;
    public  scheduler :string;
    public  time :string;
    public  date :string;
    public  contact :string;
}
