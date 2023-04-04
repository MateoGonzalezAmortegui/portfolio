import { Component } from '@angular/core';
import { IdiomService } from 'src/app/services/idiom.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent {
  constructor(private idiom: IdiomService) {}

  language$ = this.idiom.language$;
}
