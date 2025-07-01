import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fc-button',
  template: `<button [ngClass]="classes" [type]="type" (click)="onClick.emit($event)"><ng-content></ng-content></button>`
})
export class FCButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() type: string = 'button';
  @Output() onClick = new EventEmitter<Event>();

  get classes() {
    return [
      'fc-btn',
      `fc-btn-${this.variant}`
    ];
  }
} 