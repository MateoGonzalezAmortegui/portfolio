import { Component, Input } from '@angular/core';
import { IdiomService } from 'src/app/services/idiom.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  @Input() img1: String;
  @Input() img2: String;
  @Input() img3: String;

  @Input() tittle: String;
  @Input() description: String;

  @Input() toolsHtml: boolean;
  @Input() toolsCss: boolean;
  @Input() toolsTailwind: boolean;
  @Input() toolsJs: boolean;
  @Input() toolsReact: boolean;
  @Input() toolsAngular: boolean;
  @Input() toolsScss: boolean;
  @Input() toolsTypejs: boolean;

  @Input() github: String;
  @Input() urlPageGithub: String;

  page: number = 1;

  backPage() {
    this.page -= 1;
    if (this.page <= 0) {
      this.page = 1;
    }
  }

  nextPage() {
    this.page += 1;
    if (this.page >= 3) {
      this.page = 3;
    }
  }

  constructor(private idiom: IdiomService) {}

  language$ = this.idiom.language$;
}
