import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{
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
