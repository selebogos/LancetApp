import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-sidebarnavigation',
  templateUrl: './sidebarnavigation.component.html',
  styleUrls: ['./sidebarnavigation.component.css']
})
export class SidebarnavigationComponent implements AfterViewInit  {
 // @ViewChild('toggle', {static: false}) public myDiv: ElementRef;

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  Userrole$: Observable<string>;
  userrole:string;
  IsRightUser:boolean;
  roles:any;
  constructor(private register: RegisterService) { }
  ngOnInit() {
    this.userrole="";
    this.roles=[];
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;
    this.Userrole$ = this.register.currentUserRole;
    this.Userrole$.subscribe(data=>{
        console.log('am i logged in as ', data);
        if(data==='Manager')
        {
          this.IsRightUser=true;
        }
        this.userrole=data;
    });


    this.register.getUserrole().subscribe(

      data => {
        this.roles = data as any;

        console.log(this.roles);
        if(this.roles.length>0 && this.roles[0]==='Manager')
        {
          this.IsRightUser=true;
          this.userrole=this.roles[0];
        }
        else{
          this.IsRightUser=false;
          this.userrole=this.roles[0];
        }

      },
      error => {
        console.log('Error:Problem getting the user role ' + error);

    });

  }
  ngAfterViewInit() {
   // console.log(this.myDiv.nativeElement);
  }

}
