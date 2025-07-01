import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fc-modal',
  template: `
    <div [ngClass]="['fc-modal', open ? 'fc-modal-active' : '']" tabindex="-1" role="dialog" aria-modal="true" (click)="onBackdrop($event)">
      <div class="fc-modal-content">
        <ng-content></ng-content>
        <button class="fc-modal-close" (click)="close.emit()" type="button" aria-label="Đóng">×</button>
      </div>
    </div>
  `
})
export class FCModalComponent {
  @Input() open: boolean = false;
  @Output() close = new EventEmitter<void>();

  onBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) this.close.emit();
  }
} 