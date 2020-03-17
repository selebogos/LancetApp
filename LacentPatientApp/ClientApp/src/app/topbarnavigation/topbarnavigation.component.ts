import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, Renderer } from '@angular/core';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../_models/UserModel';


@Component({
  selector: 'app-topbarnavigation',
  templateUrl: './topbarnavigation.component.html',
  styleUrls: ['./topbarnavigation.component.css']
})
export class TopbarnavigationComponent implements OnInit, AfterViewInit  {

  LoginStatus$: Observable<boolean>;
  Username$: Observable<string>;
  Username:string;
  User: UserModel;
  //@ViewChild('pageTop', { static: false }) myDiv: ElementRef;
  constructor(private router:Router,private renderer: Renderer ,private register: RegisterService) {

  }

  ngOnInit() {

    this.User = new UserModel();
    this.LoginStatus$ = this.register.isLoggedIn;
    this.Username$ = this.register.currentUsername;

    this.Username$.subscribe((data: string) => {

      this.Username=data;
    });

    this.register.getProfileDetails().subscribe(

      data => {
        this.User = data as any;
        this.Username = this.User.email;


        console.log(this.User);
      },
      error => {
        console.log('Error:Problem getting the user details ' + error);

    });


  }
 // @ViewChild('toggle', {static: false}) myDiv: ElementRef;


  ngAfterViewInit() {
    //console.log(this.myDiv.nativeElement);
  }

  toggle(event){
      let element = document.getElementById('accordionSidebar');
      if(element!==null && element!==undefined ){

        if(document.getElementById('accordionSidebar').getAttribute('data-target')==='false')
        {
          document.getElementById('accordionSidebar').setAttribute('data-target','true');
          const name = 'toggled';
          const arr = element.className.split(' ');
          if (arr.indexOf(name) == -1) {
            element.className += " " + name;
          }
          else{
            element.className = element.className.replace(/\btoggled\b/g, '');
          }

        }else{
          document.getElementById('accordionSidebar').setAttribute('data-target','false');

          element.className = element.className.replace(/\btoggled\b/g, '');
        }
      }
  }

  onLogout() {
    debugger;
    $("body")[0].lastElementChild.remove();
    this.register.logout();
    $("#page-top").css("overflow","inherit");
    $("#page-top").css("padding-right","0px")

   // location.reload();
  }
}
