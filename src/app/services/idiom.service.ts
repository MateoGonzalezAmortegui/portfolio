import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdiomService {
  private language = new BehaviorSubject<boolean>(true);
  language$ = this.language.asObservable();

  c: number = 0;
  change() {
    if (this.c == 0) {
      this.language.next(false);
      this.c = 1;
    } else {
      this.language.next(true);
      this.c = 0;
    }
  }
}
