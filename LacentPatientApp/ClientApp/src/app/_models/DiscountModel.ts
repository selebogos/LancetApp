import { Injectable } from "@angular/core";
import { CustomerTypeModel } from './CustomerTypeModel';
import { WashTypeModel } from './WashTypeModel';
import { VehicleTypeModel } from './VehicleTypeModel';
import { BranchModel } from './BranchModel';



@Injectable({
    providedIn:'root'
})

export class DiscountModel{


    public  discountId:number;

        public  description:string;

        public disabled:boolean;

        public  percentage :number;

        public  customerType:string;
        public  customerTypes:CustomerTypeModel[];
        public  branches:BranchModel[];
        public  customerTypeId :number

        public  washType :string;
        public  washTypes :WashTypeModel[];
        public  vehicleType :string;
        public  vehicleTypes :VehicleTypeModel[];

        public  pricingDetailId :string;
        public  onWhichDate :Date;
        public  toWhichDate :Date;

        public day :number;

        public  amount :number;


}
