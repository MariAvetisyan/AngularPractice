import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[require]'
})

export class RequiredDirective {

  private isRequire: boolean;

  constructor(private elem: ElementRef, private render: Renderer2) {
  }

  @Input()
  set require(condition) {
    this.isRequire = condition;
    this.addAsterisk();
  }

  addAsterisk() {
    if (this.isRequire) {
      this.render.addClass(this.elem.nativeElement, 'label-required');
    }
  }
}
