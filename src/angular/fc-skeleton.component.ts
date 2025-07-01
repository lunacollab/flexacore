import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-skeleton',
  template: `
    <div 
      [ngClass]="classes"
      [style.width]="width"
      [style.height]="height"
    ></div>
  `
})
export class FCSkeletonComponent {
  @Input() variant: 'text' | 'circular' | 'rectangular' = 'text';
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() animated: boolean = true;

  get classes() {
    return [
      'fc-skeleton',
      `fc-skeleton-${this.variant}`,
      this.animated ? 'fc-skeleton-animated' : ''
    ];
  }
} 