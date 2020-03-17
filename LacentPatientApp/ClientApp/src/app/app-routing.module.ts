import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { VehicletypesComponent } from './vehicletypes/vehicletypes.component';
import { WashtypesComponent } from './washtypes/washtypes.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SitelayoutComponent } from './sitelayout/sitelayout.component';
import { ApplayoutComponent } from './applayout/applayout.component';
import { CustomertypeComponent } from './customertype/customertype.component';
import { CustomertypesComponent } from './customertypes/customertypes.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { WashtypeComponent } from './washtype/washtype.component';
import { PricingdetailsComponent } from './pricingdetails/pricingdetails.component';
import { OrderComponent } from './order/order.component';
import { PaymentmethodComponent } from './paymentmethod/paymentmethod.component';
import { DiscountComponent } from './discount/discount.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { CustomereditComponent } from './customeredit/customeredit.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { OrdereditComponent } from './orderedit/orderedit.component';
import { OrdersComponent } from './orders/orders.component';
import { EditcustomertypeComponent } from './editcustomertype/editcustomertype.component';
import { CustomertypedetailsComponent } from './customertypedetails/customertypedetails.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { PricingdetailsviewComponent } from './pricingdetailsview/pricingdetailsview.component';
import { MoneyintillComponent } from './moneyintill/moneyintill.component';
import { MoneyintillsComponent } from './moneyintills/moneyintills.component';
import { CashupComponent } from './cashup/cashup.component';
import { CashupsComponent } from './cashups/cashups.component';
import { CashonhandsComponent } from './cashonhands/cashonhands.component';
import { CashonhandComponent } from './cashonhand/cashonhand.component';
import { LoyaltyprogramComponent } from './loyaltyprogram/loyaltyprogram.component';
import { LoyaltyprogramdetailsComponent } from './loyaltyprogramdetails/loyaltyprogramdetails.component';
import { DiscountdetailsComponent } from './discountdetails/discountdetails.component';
import { DiscounteditComponent } from './discountedit/discountedit.component';
import { CashupeditComponent } from './cashupedit/cashupedit.component';
import { CashupdetailsComponent } from './cashupdetails/cashupdetails.component';
import { CashonhanddetailsComponent } from './cashonhanddetails/cashonhanddetails.component';
import { CashonhandeditComponent } from './cashonhandedit/cashonhandedit.component';
import { MoneyintilldetailsComponent } from './moneyintilldetails/moneyintilldetails.component';
import { MoneyintilleditComponent } from './moneyintilledit/moneyintilledit.component';
import { PricingComponent } from './pricing/pricing.component';
import { PricingdetailseditComponent } from './pricingdetailsedit/pricingdetailsedit.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserlistComponent } from './userlist/userlist.component';
import { VehicletypedetailsComponent } from './vehicletypedetails/vehicletypedetails.component';
import { VehicletypeeditComponent } from './vehicletypeedit/vehicletypeedit.component';
import { WashtypedetailsComponent } from './washtypedetails/washtypedetails.component';
import { WashtypeeditComponent } from './washtypeedit/washtypeedit.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileeditComponent } from './profileedit/profileedit.component';
import { BranchComponent } from './branch/branch.component';
import { BrancheditComponent } from './branchedit/branchedit.component';
import { BranchdetailsComponent } from './branchdetails/branchdetails.component';
import { BranchesComponent } from './branches/branches.component';
import { ReportsComponent } from './reports/reports.component';
import { PricingplanComponent } from './pricingplan/pricingplan.component';
import { SupportComponent } from './support/support.component';
import { RegistrationconfirmationComponent } from './registrationconfirmation/registrationconfirmation.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResetpasswordrequestComponent } from './resetpasswordrequest/resetpasswordrequest.component';
import { ResetpasswordsuccessComponent } from './resetpasswordsuccess/resetpasswordsuccess.component';
import { BookingComponent } from './booking/booking.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BookingsuccessComponent } from './bookingsuccess/bookingsuccess.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PatientComponent } from './patient/patient.component';
import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
import { PatienteditComponent } from './patientedit/patientedit.component';
import { PatientsComponent } from './patients/patients.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { RequisitiondetailsComponent } from './requisitiondetails/requisitiondetails.component';
import { RequisitioneditComponent } from './requisitionedit/requisitionedit.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';

const routes: Routes = [

  //Site routes goes here
  {
    path: '',
    component: SitelayoutComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgotpassword', component: ForgotpasswordComponent },
      { path: 'reset/:data', component: ResetpasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'bookingsuccess', component: BookingsuccessComponent },
      { path: '', component: IndexComponent, pathMatch: 'full' },
    ]
  },

  { path: 'confirmregistration', component: RegistrationconfirmationComponent },
  { path: 'passwordresetrequest', component: ResetpasswordrequestComponent },
  { path: 'passwordresetsuccess', component: ResetpasswordsuccessComponent },
  { path: 'pricingplan', component: PricingplanComponent },
  { path: 'support', component: SupportComponent },
  // App routes goes here here
  {
    path: '',
    component: ApplayoutComponent,
    children: [
      // -------------------Patient-------------------------------------------------------
      { path: 'patient', component: PatientComponent },
      { path: 'patientdetails/:id', component: PatientdetailsComponent },
      { path: 'editpatient/:id', component: PatienteditComponent },
      { path: 'patients', component: PatientsComponent },

       // -------------------Requisition-------------------------------------------------------
       { path: 'requisition', component: RequisitionComponent },
       { path: 'requisitiondetails/:id', component: RequisitiondetailsComponent },
       { path: 'editrequisition/:id', component: RequisitioneditComponent },
       { path: 'requisitions', component: RequisitionsComponent },

      { path: 'home', component: HomeComponent },
    ]
  },

  //no layout routes


  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
