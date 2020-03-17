import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { WashtypesComponent } from './washtypes/washtypes.component';
import { VehicletypesComponent } from './vehicletypes/vehicletypes.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidebarnavigationComponent } from './sidebarnavigation/sidebarnavigation.component';
import { TopbarnavigationComponent } from './topbarnavigation/topbarnavigation.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { ContentwrapperComponent } from './contentwrapper/contentwrapper.component';
import { PagecontentComponent } from './pagecontent/pagecontent.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './customer/customer.component';
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
import { CustomertypesComponent } from './customertypes/customertypes.component';
import { CustomertypeComponent } from './customertype/customertype.component';
import { WashtypeComponent } from './washtype/washtype.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { PaymentmethodsComponent } from './paymentmethods/paymentmethods.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import {JwtInterceptor} from './_helpers/jwt.Interceptor';
import { PricingdetailsComponent } from './pricingdetails/pricingdetails.component';
import {NgSelectizeModule} from 'ng-selectize';
import { MatAutocompleteModule, MatInputModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular//platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DiscountComponent } from './discount/discount.component';
import { CustomereditComponent } from './customeredit/customeredit.component';
import { OrdereditComponent } from './orderedit/orderedit.component';
import { MoneyintillComponent } from './moneyintill/moneyintill.component';
import { CashupComponent } from './cashup/cashup.component';
import { CashonhandComponent } from './cashonhand/cashonhand.component';
import { CustomertypedetailsComponent } from './customertypedetails/customertypedetails.component';
import { EditcustomertypeComponent } from './editcustomertype/editcustomertype.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { PricingdetailsviewComponent } from './pricingdetailsview/pricingdetailsview.component';
import { MoneyintillsComponent } from './moneyintills/moneyintills.component';
import { CashonhandsComponent } from './cashonhands/cashonhands.component';
import { CashupsComponent } from './cashups/cashups.component';
import { LoyaltyprogramComponent } from './loyaltyprogram/loyaltyprogram.component';
import { LoyaltyprogramdetailsComponent } from './loyaltyprogramdetails/loyaltyprogramdetails.component';
import { DiscountdetailsComponent } from './discountdetails/discountdetails.component';
import { DiscounteditComponent } from './discountedit/discountedit.component';
import { CashupdetailsComponent } from './cashupdetails/cashupdetails.component';
import { CashupeditComponent } from './cashupedit/cashupedit.component';
import { CashonhanddetailsComponent } from './cashonhanddetails/cashonhanddetails.component';
import { CashonhandeditComponent } from './cashonhandedit/cashonhandedit.component';
import { MoneyintilleditComponent } from './moneyintilledit/moneyintilledit.component';
import { MoneyintilldetailsComponent } from './moneyintilldetails/moneyintilldetails.component';
import { PricingdetailseditComponent } from './pricingdetailsedit/pricingdetailsedit.component';
import { PricingComponent } from './pricing/pricing.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UsereditComponent } from './useredit/useredit.component';
import { WashtypedetailsComponent } from './washtypedetails/washtypedetails.component';
import { WashtypeeditComponent } from './washtypeedit/washtypeedit.component';
import { VehicletypeeditComponent } from './vehicletypeedit/vehicletypeedit.component';
import { VehicletypedetailsComponent } from './vehicletypedetails/vehicletypedetails.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BranchComponent } from './branch/branch.component';
import { BranchesComponent } from './branches/branches.component';
import { BrancheditComponent } from './branchedit/branchedit.component';
import { BranchdetailsComponent } from './branchdetails/branchdetails.component';
import { ReportsComponent } from './reports/reports.component';
import { PricingplanComponent } from './pricingplan/pricingplan.component';
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

//import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    UsersComponent,
    WashtypesComponent,
    VehicletypesComponent,
    NavigationComponent,
    PageNotFoundComponent,
    SidebarnavigationComponent,
    TopbarnavigationComponent,
    WrapperComponent,
    ContentwrapperComponent,
    PagecontentComponent,
    FooterComponent,
    CustomerComponent,
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
    CustomertypesComponent,
    CustomertypeComponent,
    WashtypeComponent,
    VehicletypeComponent,
    PaymentmethodComponent,
    PaymentmethodsComponent,
    OrderComponent,
    OrdersComponent,
    OrderdetailsComponent,
    CustomerdetailsComponent,
    PricingdetailsComponent,
    DiscountComponent,
    CustomereditComponent,
    OrdereditComponent,
    MoneyintillComponent,
    CashupComponent,
    CashonhandComponent,
    CustomertypedetailsComponent,
    EditcustomertypeComponent,
    DiscountsComponent,
    PricingdetailsviewComponent,
    MoneyintillsComponent,
    CashonhandsComponent,
    CashupsComponent,
    LoyaltyprogramComponent,
    LoyaltyprogramdetailsComponent,
    DiscountdetailsComponent,
    DiscounteditComponent,
    CashupdetailsComponent,
    CashupeditComponent,
    CashonhanddetailsComponent,
    CashonhandeditComponent,
    MoneyintilleditComponent,
    MoneyintilldetailsComponent,
    PricingdetailseditComponent,
    PricingComponent,
    UserlistComponent,
    UserdetailsComponent,
    UsereditComponent,
    WashtypedetailsComponent,
    WashtypeeditComponent,
    VehicletypeeditComponent,
    VehicletypedetailsComponent,
    ProfileComponent,
    ProfileeditComponent,
    BranchComponent,
    BranchesComponent,
    BrancheditComponent,
    BranchdetailsComponent,
    ReportsComponent,
    PricingplanComponent,
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
