import { Injectable } from "@angular/core";
import { TestResultModel } from './TestResultModel';

@Injectable({
    providedIn:'root'
})

export class TestModel {

    public  Id : string;
    public name:string;
    public  comment :string;
    public  testResultId :number;
    public  NormalValueId :number;
    public TestResult:TestResultModel;
}
