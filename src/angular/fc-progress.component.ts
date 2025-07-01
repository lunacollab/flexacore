import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-progress',
  template: `
    <div class="fc-progress">
      <div 
        class="fc-progress-bar" 
        [ngClass]="['fc-progress-bar-' + variant]"
        [style.width.%]="value"
        role="progressbar"
        [attr.aria-valuenow]="value"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span class="fc-progress-text" *ngIf="showLabel">{{ value }}%</span>
      </div>
    </div>
  `
})
export class FCProgressComponent {
  @Input() value: number = 0;
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
  @Input() showLabel: boolean = false;
} 