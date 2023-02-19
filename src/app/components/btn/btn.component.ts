import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent {

  @Input() icons:'rocket'|'resume';

  @Input() size='';

  get sizes(){
    return{
      'lg:w-56 lg:h-16 lg:text-xl': this.size==='large'
    }
  }

  @Input() sizeIcon='';

  get sizesIcon(){
    return{
      'lg:w-12 lg:h-12': this.sizeIcon==='large'
    }
  }

  @Input() urlPage:String;
}
