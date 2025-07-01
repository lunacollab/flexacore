import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'fc-tooltip',
  template: `
    <div 
      [ngClass]="['fc-tooltip', show ? 'fc-tooltip-show' : '']"
      [style.left.px]="position.x"
      [style.top.px]="position.y"
      role="tooltip"
    >
      {{ content }}
    </div>
  `
})
export class FCTooltipComponent {
  @Input() content: string = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();

  position = { x: 0, y: 0 };

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.show = true;
    this.showChange.emit(true);
    this.updatePosition();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.show = false;
    this.showChange.emit(false);
  }

  private updatePosition() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltip = this.elementRef.nativeElement.querySelector('.fc-tooltip');
    
    if (tooltip) {
      const tooltipRect = tooltip.getBoundingClientRect();
      
      switch (this.placement) {
        case 'top':
          this.position.x = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
          this.position.y = rect.top - tooltipRect.height - 8;
          break;
        case 'bottom':
          this.position.x = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
          this.position.y = rect.bottom + 8;
          break;
        case 'left':
          this.position.x = rect.left - tooltipRect.width - 8;
          this.position.y = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
          break;
        case 'right':
          this.position.x = rect.right + 8;
          this.position.y = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
          break;
      }
    }
  }
} 