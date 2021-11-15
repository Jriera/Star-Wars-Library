import { Directive, Input, HostBinding } from '@angular/core';


@Directive({
  selector: 'img[default]',
    host: {
      '(error)':'updateUrl()',
      '(load)': 'load()',
      '[src]':'src'
    }
})
export class ImageErrorHandlerDirective {

  @Input() src:string='';
  @Input() default:string='';
  @HostBinding('class') className:string = 'image-not-loaded';

  
  constructor() { 

  }

  updateUrl() {
   this.src = this.default;
   
  }
  load(){
    this.className = 'image-loaded';
  }

}
