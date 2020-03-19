import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrllLogin: string = "/api/account/login";
  private baseUrllReset: string = "/api/account/reset";
  private baseUrllChangePassword: string = "/api/account/changepassword";
  private baseUrllForgotPassword: string = "/api/account/forgotPassword";
  private baseUrlRegister: string = "/api/account/register";
  private baseUrlAddUser: string = "/api/account/create";
  private baseUrlUpdateUser: string = "/api/account/edit";
  private baseUrlUserDetails :string = "/api/account/details/?id=";
  private baseUrlRole: string = "/api/account/getuserrole";
  private baseUrlProfileDetails :string = "/api/account/profile";
  private baseUrlGetProfileImage:string = "/api/account/profileimage/";
  private baseUrlProfileEditDetails :string = "/api/account/profileedit";
  private loginStatus=new BehaviorSubject<boolean>(this.checkLoLoginStatus());
  private Username=new BehaviorSubject<string>(localStorage.getItem('email'));
  private UserRole=new BehaviorSubject<string>(localStorage.getItem('userRole'));
  private token=new BehaviorSubject<string>(localStorage.getItem('jwt'));
  public imageUrl=new BehaviorSubject<string>(localStorage.getItem('imageUrl'));

  constructor(private http: HttpClient,private router:Router) {
  }

  checkLoLoginStatus():boolean{
    var loginCookie=localStorage.getItem("loginStatus");
    if(loginCookie==="1")
    {
      return true;
    }
    return false;
  }

  login(Email:string,password:string){

    this.loginStatus.next(false);
          localStorage.setItem('loginStatus','0');
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          localStorage.removeItem('expiration');
          localStorage.removeItem('userRole');

    return this.http.post<any>(this.baseUrllLogin,{Email,password}).pipe(
      map(result=>{

        this.loginStatus.next(false);
          localStorage.setItem('loginStatus','0');
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          localStorage.removeItem('expiration');
          localStorage.removeItem('userRole');

        if(result && result.token)
        {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus','1');
          localStorage.setItem('jwt',result.token);
          localStorage.setItem('email',result.username);
          localStorage.setItem('expiration',result.tokenExpiryTime);
          localStorage.setItem('userRole',result.userRole);
        }
        return result;
      })

    );

  }

  reset(confirmPassword:string,password:string,token:string){

    return this.http.post<any>(this.baseUrllReset,{confirmPassword,password,token}).pipe(
      map(result=>{
        return result;
      })
    );
  }
  forgotPassword(email:string){

    return this.http.post<any>(this.baseUrllForgotPassword,{email}).pipe(
      map(result=>{
        return result;
      })

    );
  }
  changePassword(currentPassword:string,confirmPassword:string,password:string){

    return this.http.post<any>(this.baseUrllChangePassword,{currentPassword,confirmPassword,password}).pipe(
      map(result=>{
        return result;
      })
    );
  }
  register(firstname:string,lastname:string,password:string,email:string){

    try {

      return this.http.post<any>(this.baseUrlRegister, { firstname, lastname, password, email }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }

  addUser(isActive:boolean,userrole:string,firstname:string,lastname:string,email:string,password:string,branch:string){

    try {

      return this.http.post<any>(this.baseUrlAddUser, { isActive,userrole,firstname,
        lastname, password, email,branch }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }

  updateUser(isActive:boolean,userrole:string,firstname:string,lastname:string,
    email:string,password:string,id:number,branch:string){

    try {

      return this.http.post<any>(this.baseUrlUpdateUser, { isActive,userrole,firstname,
        lastname, password, email,id,branch }).pipe(
        map(result => {

          return result;

        }, error => {
          return error;
        }));

    } catch (e) {

    }

  }

  logout(){
    this.loginStatus.next(false);
          localStorage.setItem('loginStatus','0');
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          localStorage.removeItem('expiration');
          localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
    console.log('User logged out successfully.');
  }
  get profileImage(){
    return this.imageUrl.asObservable();
  }
  setImageUrl(data:string){
    localStorage.removeItem('imageUrl');
    localStorage.setItem('imageUrl',data);
    return;
  }
  get isLoggedIn(){
    return this.loginStatus.asObservable();
  }

  get loginData(){
    return this.token.asObservable();
  }

  get currentUsername(){

    return this.Username.asObservable();
  }

  get currentUserRole(){

    return this.UserRole.asObservable();
  }

  public getUserDetails(id:number){
    try{

      var  uri = this.baseUrlUserDetails + id;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting customer details "+ e.Message);
      return e.Message;
    }
  }

  public getUserrole(){
    try{
        var  uri = this.baseUrlRole;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting user role "+ e.Message);
      return e.Message;
    }
  }
  public getProfileDetails(){
    try{

      var  uri = this.baseUrlProfileDetails;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        return this.http.get(uri, { headers }).pipe(
          map(result=>{

            localStorage.removeItem('imageUrl');
            let data=result as any;

            if(data.path!==null && data.path!==undefined)
            {
              localStorage.removeItem('imageUrl');
              localStorage.setItem('imageUrl',data.path);
            }
            return result;
          })

        );

    } catch(e){
      console.log("Error:problem getting profile details "+ e.Message);
      return e.Message;
    }
  }
  public getProfileImage(){

    try{
      var  uri = this.baseUrlGetProfileImage;
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return this.http.get(uri, { headers });

    } catch(e){
      console.log("Error:problem getting profile image "+ e.Message);
      return e.Message;
    }
  }

  public updateProfileDetails(userrole:string,firstname:string,lastname:string,email:string,password:string,
    businessName:string,street:string,city:string,suburb:string,postalCode:string){

    try {

      return this.http.post<any>(this.baseUrlProfileEditDetails, { userrole,firstname, lastname,
         password, email,businessName,street,city,suburb,postalCode}).pipe(
        map(result => {
          return result;
        }, error => {
          return error;
        }));

    } catch (e) {

    }
  }


}
