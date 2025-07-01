import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-badge',
  template: `
    <span [ngClass]="classes">
      <ng-content></ng-content>
    </span>
  `
})
export class FCBadgeComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() pill: boolean = false;

  get classes() {
    return [
      'fc-badge',
      `fc-badge-${this.variant}`,
      `fc-badge-${this.size}`,
      this.pill ? 'fc-badge-pill' : ''
    ];
  }
} 