import { Component } from '@angular/core';
import { IdiomService } from 'src/app/services/idiom.service';

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
  }
  toogleExp2() {
    this.select2 = true;
    this.select1 = false;
  }

  constructor(private idiom: IdiomService) {}

  language$ = this.idiom.language$;
}
