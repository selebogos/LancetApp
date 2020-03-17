import { Injectable } from "@angular/core";



@Injectable({
    providedIn:'root'
})

export class POSModel{

    public tillId :number;
    public posId :number;
    public cashupId :number;
    public amount1 :string;
    public amount2 :string;
    public amount3 :string;
    public amount4 :string;
    public amount5 :string;
    public amount6 :string;
    public amount7 :string;
    public amount8 :string;
    public note :string;
    public dateCreated:Date;

}
