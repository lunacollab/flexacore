import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Component({
  selector: 'fc-form-group',
  template: `
    <div [ngClass]="['fc-form-group', error ? 'fc-form-group-error' : '']">
      <label class="fc-form-label" *ngIf="label">{{ label }}</label>
      <ng-content></ng-content>
      <div class="fc-form-error" *ngIf="error">{{ error }}</div>
      <div class="fc-form-help" *ngIf="help">{{ help }}</div>
    </div>
  `
})
export class FCFormGroupComponent {
  @Input() label: string = '';
  @Input() error: string = '';
  @Input() help: string = '';
}

@Component({
  selector: 'fc-form',
  template: `
    <form 
      [ngClass]="classes"
      (ngSubmit)="onSubmit.emit($event)"
      #form="ngForm"
    >
      <ng-content></ng-content>
    </form>
  `
})
export class FCFormComponent {
  @Input() layout: 'vertical' | 'horizontal' | 'inline' = 'vertical';
  @Input() novalidate: boolean = true;
  @Output() onSubmit = new EventEmitter<Event>();

  get classes() {
    return [
      'fc-form',
      `fc-form-${this.layout}`
    ];
  }
} 