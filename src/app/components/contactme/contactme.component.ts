import { Component } from '@angular/core';
import { IdiomService } from 'src/app/services/idiom.service';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.scss'],
})
export class ContactmeComponent {
  constructor(private idiom: IdiomService) {}

  language$ = this.idiom.language$;
}
