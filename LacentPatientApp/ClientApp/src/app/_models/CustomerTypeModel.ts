import { Injectable } from "@angular/core";



@Injectable({
    providedIn:'root'
})

export class CustomerTypeModel{

    public  customerTypeId:number;
    public  name :string;
    public isSelected:true;

}
