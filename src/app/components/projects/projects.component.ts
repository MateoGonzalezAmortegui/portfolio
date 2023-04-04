import { Component } from '@angular/core';
import { IdiomService } from 'src/app/services/idiom.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private idiom: IdiomService) {}

  language$ = this.idiom.language$;
}
