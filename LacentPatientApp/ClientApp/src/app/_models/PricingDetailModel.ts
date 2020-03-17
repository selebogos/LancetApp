import { Injectable } from "@angular/core";
import { WashTypeModel } from './WashTypeModel';
import { VehicleTypeModel } from './VehicleTypeModel';

@Injectable({
    providedIn:'root'
})

export class PricingDetailModel{

    public  pricingDetailId:number ;
        public  amount:string;
        public  description :string;
        public  vehicleTypeId :number;
        public  washTypeId :number;
        public  vehicleType :string;
        public  washType :string
        public  dateAdded :Date;
        public  washTypeInfo:WashTypeModel;
        public  vehicleTypeInfo:VehicleTypeModel;
}
