import { Component } from '@angular/core';

@Component({
  selector: 'app-exp-work',
  templateUrl: './exp-work.component.html',
})
export class ExpWorkComponent {
  select1: boolean = true;
  select2: boolean = false;

  toogleExp() {
    this.select1 = true;
    this.select2 = false;
    this.changeJob();
  }
  toogleExp2() {
    this.select2 = true;
    this.select1 = false;
    this.changeJob();
  }

  tittle: string = 'Semillero JR';
  p1: string =
    '✅ Desarrollo e implementación de Microservicios, frontend y desarrollo mobile bajo metodologías Scrum.';
  p2: string =
    '📝1. Mantenimiento y depuración de diferentes proyectos para mejorar el rendimiento y tener un código limpio.';
  p3: string =
    '📝2. Desarrollo de implementaciones o servicios para clientes de la red.';

  changeJob() {
    if (this.select1) {
      this.tittle = 'Semillero JR';
      this.p1 =
        '✅ Desarrollo e implementación de Microservicios, frontend y desarrollo mobile bajo metodologías Scrum.';
      this.p2 =
        '📝1. Mantenimiento y depuración de diferentes proyectos para mejorar el rendimiento y tener un código limpio.';
      this.p3 =
        '📝2. Desarrollo de implementaciones o servicios para clientes de la red.';
    }

    if (this.select2) {
      this.tittle = 'Monitor';
      this.p1 = '✅ Desarrollo.';
      this.p2 = '📝1. Mantenimiento .';
      this.p3 = '📝2. Desarrollo.';
    }
  }
}
