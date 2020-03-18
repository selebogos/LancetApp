import { Injectable } from "@angular/core";
import { TestResultModel } from './TestResultModel';
import { RequisitionModel } from './RequisitionModel';
import { NormalRangeModel } from './NormalRangeModel';

@Injectable({
    providedIn:'root'
})

export class TestModel {

    public  id : string;
    public name:string;
    public  comment :string;
    public  testResultId :number;

    public  normalValueId :number;
    public testResult:TestResultModel;
    public  requisitionId :string;
    public requisition:RequisitionModel;
    public  normalRange :NormalRangeModel;
}
