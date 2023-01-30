import { Component} from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  darkMode:boolean=true;

  toggleDarkMode(){
    this.darkMode=!this.darkMode;
  }

  ngOnInit(){
    AOS.init();
    window.addEventListener('load',AOS.refresh)
  }
}