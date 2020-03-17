import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivatUIService {

  constructor() { }
  public initToggle(){
    let element = document.getElementById('accordionSidebar');
      if ($(window).width() < 768) {
          if (element !== null && element !== undefined) {
            const name = 'toggled';
            const arr = element.className.split(' ');
            if (arr.indexOf(name) == -1) {
              element.className += " " + name;
            }else{

            }
          }
          else{
            element.className = element.className.replace(/\btoggled\b/g, '');
          }
      }
      else {
          element.className = element.className.replace(/\btoggled\b/g, '');
      }
  }
}
