import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'fc-select',
  template: `
    <select 
      [ngClass]="classes"
      [value]="value"
      [disabled]="disabled"
      (change)="handleChange($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
    >
      <option value="" *ngIf="placeholder">{{ placeholder }}</option>
      <option 
        *ngFor="let option of options"
        [value]="option.value"
        [disabled]="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FCSelectComponent),
      multi: true
    }
  ]
})
export class FCSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() valueChange = new EventEmitter<string | number>();

  value: string | number = '';
  private onChange = (value: string | number) => {};
  private onTouched = () => {};

  get classes() {
    return [
      'fc-select',
      `fc-select-${this.size}`
    ];
  }

  handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onBlur() {
    this.onTouched();
  }

  onFocus() {
    // Focus event handling if needed
  }

  writeValue(value: string | number): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
} 