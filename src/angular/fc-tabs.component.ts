import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Component({
  selector: 'fc-tab',
  template: `
    <div [ngClass]="['fc-tab-pane', active ? 'fc-tab-pane-active' : '']" *ngIf="active">
      <ng-content></ng-content>
    </div>
  `
})
export class FCTabComponent {
  @Input() title: string = '';
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
}

@Component({
  selector: 'fc-tabs',
  template: `
    <div class="fc-tabs">
      <div class="fc-tabs-nav">
        <button 
          *ngFor="let tab of tabs; let i = index"
          [ngClass]="['fc-tabs-tab', tab.active ? 'fc-tabs-tab-active' : '', tab.disabled ? 'fc-tabs-tab-disabled' : '']"
          (click)="selectTab(i)"
          [disabled]="tab.disabled"
        >
          {{ tab.title }}
        </button>
      </div>
      <div class="fc-tabs-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class FCTabsComponent implements AfterContentInit {
  @ContentChildren(FCTabComponent) tabs!: QueryList<FCTabComponent>;
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  ngAfterContentInit() {
    this.selectTab(this.activeIndex);
  }

  selectTab(index: number) {
    if (index >= 0 && index < this.tabs.length && !this.tabs.toArray()[index].disabled) {
      this.tabs.forEach((tab, i) => tab.active = i === index);
      this.activeIndex = index;
      this.activeIndexChange.emit(index);
    }
  }
} 