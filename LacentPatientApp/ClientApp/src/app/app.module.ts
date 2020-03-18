import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarnavigationComponent } from './sidebarnavigation/sidebarnavigation.component';
import { TopbarnavigationComponent } from './topbarnavigation/topbarnavigation.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ContentwrapperComponent } from './contentwrapper/contentwrapper.component';
import { PagecontentComponent } from './pagecontent/pagecontent.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { IndexComponent } from './index/index.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SitelayoutComponent } from './sitelayout/sitelayout.component';
import { ApplayoutComponent } from './applayout/applayout.component';
import {JwtInterceptor} from './_helpers/jwt.Interceptor';
import {NgSelectizeModule} from 'ng-selectize';
import { MatAutocompleteModule, MatInputModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular//platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SupportComponent } from './support/support.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegistrationconfirmationComponent } from './registrationconfirmation/registrationconfirmation.component';
import { ResetpasswordrequestComponent } from './resetpasswordrequest/resetpasswordrequest.component';
import { ResetpasswordsuccessComponent } from './resetpasswordsuccess/resetpasswordsuccess.component';
import { BookingComponent } from './booking/booking.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BookingsuccessComponent } from './bookingsuccess/bookingsuccess.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';
import { PatienteditComponent } from './patientedit/patientedit.component';
import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
import { TestComponent } from './test/test.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { TesteditComponent } from './testedit/testedit.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { RequisitiondetailsComponent } from './requisitiondetails/requisitiondetails.component';
import { RequisitioneditComponent } from './requisitionedit/requisitionedit.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { TestsComponent } from './tests/tests.component';

//import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    SidebarnavigationComponent,
    TopbarnavigationComponent,
    WrapperComponent,
    ContentwrapperComponent,
    PagecontentComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    LandingpageComponent,
    ForgotpasswordComponent,
    IndexComponent,
    HomeComponent,
    SitelayoutComponent,
    ApplayoutComponent,

    ProfileComponent,
    ProfileeditComponent,
    SupportComponent,
    ResetpasswordComponent,
    RegistrationconfirmationComponent,
    ResetpasswordrequestComponent,
    ResetpasswordsuccessComponent,
    BookingComponent,
    ChangepasswordComponent,
    BookingsuccessComponent,
    BookingdetailsComponent,
    BookingsComponent,
    PatientComponent,
    PatientsComponent,
    PatienteditComponent,
    PatientdetailsComponent,
    TestComponent,
    TestdetailsComponent,
    TesteditComponent,
    RequisitionComponent,
    RequisitiondetailsComponent,
    RequisitioneditComponent,
    RequisitionsComponent,
    TestsComponent,

    //ToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectizeModule,
    MatAutocompleteModule,
    MatIconModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) ,
    //MatCheckbox
  ],
  providers: [

    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
