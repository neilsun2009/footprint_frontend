import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements OnInit {

  @Input('appCounter') countTo: number;
  // @Input() color: string;
  private scrollLock: boolean;
  private currentNum: number;
  private elem;
  private elemTop;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.scrollLock = false;
    this.currentNum = 0;
  }

  ngOnInit() {
    this.elem = this.el.nativeElement;
    this.elemTop = this.elem.offsetTop;
    // this.renderer.setStyle(this.elem, 'color', this.color);
    // this.el.nativeElement.style.color = this.color;
    this.elem.innerHTML = '0';
    // this.renderer.listen('window', 'scroll', () => {
    //   this.scrollHandler();
    // });
    this.scrollHandler();
    window.addEventListener('scroll', () => {
      this.scrollHandler();
    });
  }

  goUp() {
    if (++this.currentNum <= this.countTo) {
      // this.renderer.appendChild(this.elem,
      //   document.createTextNode(this.countTo + ''));
      this.elem.innerHTML = this.currentNum;
      setTimeout(() => {
        this.goUp();
      }, 10);
    }
  }

  scrollHandler() {
    const scrollTop = document.body.scrollTop,
      clientHeight = document.documentElement.clientHeight;
    this.elemTop = this.elem.offsetTop;
    if (this.scrollLock) {
        return;
    }
    if (scrollTop + clientHeight - this.elemTop > 50) {
        this.scrollLock = true;
        this.goUp();
    }
  }

}
