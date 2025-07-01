import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fc-toast',
  template: `
    <div [ngClass]="classes" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="fc-toast-header">
        <strong class="fc-toast-title">{{ title }}</strong>
        <button type="button" class="fc-toast-close" (click)="onClose.emit()" aria-label="Đóng">×</button>
      </div>
      <div class="fc-toast-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class FCToastComponent {
  @Input() variant: 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Input() title: string = '';
  @Input() autoClose: boolean = true;
  @Input() delay: number = 5000;
  @Output() onClose = new EventEmitter<void>();

  get classes() {
    return [
      'fc-toast',
      `fc-toast-${this.variant}`
    ];
  }
} 