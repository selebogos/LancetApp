import { Injectable } from "@angular/core";



@Injectable({
    providedIn:'root'
})

export class OrderModel{

    public orderId :number;


        public  paymentMethod :string;
        public  washType :string;
        public  vehicleType:string;
        public  vehicleRegistration :string
        public  amount :string;
        public orderNo:number;
        public  customerId :number;
        public orderBelongsTo:string;

        public  paymentMethodId :number;

        public  pricingDetailId :number;

        public branch:string;
        public  createdBy :Date;

        public  dateCreated :Date;
        public dateCreatedToString : string;



}
