import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appSetBackground]',
})
export class SetBackgroundDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const panel = this.el.nativeElement.querySelector('.mat-mdc-select-panel');
    if (panel) {
      this.renderer.setStyle(panel, 'background-color', 'white');
    }
  }
}