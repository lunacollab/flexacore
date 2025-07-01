import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'fc-dropdown-item',
  template: `
    <a 
      [ngClass]="['fc-dropdown-item', disabled ? 'fc-dropdown-item-disabled' : '']"
      (click)="onClick($event)"
      [href]="href"
    >
      <ng-content></ng-content>
    </a>
  `
})
export class FCDropdownItemComponent {
  @Input() href: string = '#';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}

@Component({
  selector: 'fc-dropdown',
  template: `
    <div [ngClass]="['fc-dropdown', isOpen ? 'fc-dropdown-open' : '']">
      <button 
        [ngClass]="['fc-dropdown-toggle', 'fc-btn']"
        (click)="toggle()"
        type="button"
        aria-expanded="isOpen"
      >
        {{ label }}
        <span class="fc-dropdown-arrow"></span>
      </button>
      <div [ngClass]="['fc-dropdown-menu', isOpen ? 'fc-dropdown-menu-show' : '']">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class FCDropdownComponent implements AfterContentInit {
  @ContentChildren(FCDropdownItemComponent) items!: QueryList<FCDropdownItemComponent>;
  @Input() label: string = 'Dropdown';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.onClick.subscribe(() => {
        this.close();
      });
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(private elementRef: ElementRef) {}

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  openDropdown() {
    this.isOpen = true;
    this.isOpenChange.emit(true);
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
} 