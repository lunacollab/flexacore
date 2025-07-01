import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fc-input',
  template: `
    <input 
      [ngClass]="classes"
      [type]="type"
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="disabled"
      [readonly]="readonly"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
    >
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FCInputComponent),
      multi: true
    }
  ]
})
export class FCInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  get classes() {
    return [
      'fc-input',
      `fc-input-${this.size}`
    ];
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
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

  writeValue(value: string): void {
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