import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdiomService {
  private language = new BehaviorSubject<boolean>(true);
  language$ = this.language.asObservable();

  change() {
    this.language.next(false);
  }
}
