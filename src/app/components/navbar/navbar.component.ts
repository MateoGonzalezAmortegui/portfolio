import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleMode = new EventEmitter<string>();
  toggleDarkMode() {
    this.toggleMode.emit();
  }

  esp: boolean = true;
  eng: boolean = false;
  @Output() toggleIdiom = new EventEmitter<string>();
  toogleLanguage() {
    this.esp = !this.esp;
    this.eng = !this.eng;
    this.toggleIdiom.emit();
    this.textFile();
  }

  aboutMe: string = 'Acerca de mi';
  projects: string = 'Proyectos';
  tools: string = 'Herramientas';
  contact: string = 'Contáctame';

  textFile() {
    if (this.esp) {
      this.aboutMe = 'Acerca de mi';
      this.projects = 'Proyectos';
      this.tools = 'Herramientas';
      this.contact = 'Contáctame';
    } else {
      this.aboutMe = 'About me';
      this.projects = 'Projects';
      this.tools = 'Tools';
      this.contact = 'Contact me';
    }
  }
}
