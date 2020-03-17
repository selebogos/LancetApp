import { Injectable } from "@angular/core";
import { TestModel } from './TestModel';
import { PatientProfileModel } from './PatientProfile';

@Injectable({
    providedIn:'root'
})

export class RequisitionModel {

    public  Id : string;
    public dateSubmitted:Date;
    public  referringPhysician :string;
    public  profileId :string;
    public  Profile :PatientProfileModel;
    public tests:Array<TestModel> = [];
}
