import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fc-alert',
  template: `
    <div [ngClass]="classes" role="alert">
      <div class="fc-alert-content">
        <ng-content></ng-content>
      </div>
      <button 
        *ngIf="dismissible"
        type="button" 
        class="fc-alert-close" 
        (click)="onDismiss.emit()"
        aria-label="Đóng"
      >
        ×
      </button>
    </div>
  `
})
export class FCAlertComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'info';
  @Input() dismissible: boolean = false;
  @Output() onDismiss = new EventEmitter<void>();

  get classes() {
    return [
      'fc-alert',
      `fc-alert-${this.variant}`,
      this.dismissible ? 'fc-alert-dismissible' : ''
    ];
  }
} 