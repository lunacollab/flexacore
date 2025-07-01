import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-card',
  template: `
    <div [ngClass]="classes">
      <div class="fc-card-header" *ngIf="header || showHeader">
        <h5 class="fc-card-title">{{ header }}</h5>
        <ng-content select="[fc-card-header]"></ng-content>
      </div>
      <div class="fc-card-body">
        <ng-content></ng-content>
      </div>
      <div class="fc-card-footer" *ngIf="footer || showFooter">
        <ng-content select="[fc-card-footer]"></ng-content>
        <span *ngIf="footer">{{ footer }}</span>
      </div>
    </div>
  `
})
export class FCCardComponent {
  @Input() header: string = '';
  @Input() footer: string = '';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'light';
  @Input() border: boolean = true;
  @Input() shadow: boolean = false;
  @Input() showHeader: boolean = false;
  @Input() showFooter: boolean = false;

  get classes() {
    return [
      'fc-card',
      `fc-card-${this.variant}`,
      this.border ? 'fc-card-border' : '',
      this.shadow ? 'fc-card-shadow' : ''
    ];
  }
} 