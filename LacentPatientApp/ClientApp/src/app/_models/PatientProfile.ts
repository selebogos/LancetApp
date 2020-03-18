import { Injectable } from "@angular/core";
import { PatientViewModel } from './patientModel';
import { RequisitionModel } from './RequisitionModel';

@Injectable({
    providedIn:'root'
})

export class PatientProfileModel {

    public  id : string;
    public  patientId :number;
    public  Requisitions :Array<RequisitionModel> = [];
    public patient:PatientViewModel;
}
