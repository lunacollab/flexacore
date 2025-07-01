import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fc-switch',
  template: `
    <label [ngClass]="['fc-switch', disabled ? 'fc-switch-disabled' : '']">
      <input 
        type="checkbox" 
        [checked]="checked" 
        (change)="onChange($event)"
        [disabled]="disabled"
      >
      <span class="fc-switch-slider"></span>
      <span class="fc-switch-label" *ngIf="label">{{ label }}</span>
    </label>
  `
})
export class FCSwitchComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
} 