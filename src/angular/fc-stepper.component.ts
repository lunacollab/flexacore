import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Component({
  selector: 'fc-step',
  template: `
    <div [ngClass]="['fc-step', active ? 'fc-step-active' : '', completed ? 'fc-step-completed' : '']">
      <div class="fc-step-icon">
        <span *ngIf="!completed">{{ index + 1 }}</span>
        <span *ngIf="completed">✓</span>
      </div>
      <div class="fc-step-content">
        <div class="fc-step-title">{{ title }}</div>
        <div class="fc-step-description" *ngIf="description">{{ description }}</div>
      </div>
    </div>
  `
})
export class FCStepComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() active: boolean = false;
  @Input() completed: boolean = false;
  @Input() index: number = 0;
}

@Component({
  selector: 'fc-stepper',
  template: `
    <div class="fc-stepper">
      <div class="fc-stepper-header">
        <ng-content></ng-content>
      </div>
      <div class="fc-stepper-content">
        <div 
          *ngFor="let step of steps; let i = index"
          [ngClass]="['fc-step-pane', step.active ? 'fc-step-pane-active' : '']"
          [style.display]="step.active ? 'block' : 'none'"
        >
          <ng-content select="[fc-step-content]"></ng-content>
        </div>
      </div>
      <div class="fc-stepper-footer" *ngIf="showNavigation">
        <button 
          class="fc-btn fc-btn-secondary" 
          (click)="previous()"
          [disabled]="currentStep === 0"
        >
          Trước
        </button>
        <button 
          class="fc-btn fc-btn-primary" 
          (click)="next()"
          [disabled]="currentStep === steps.length - 1"
        >
          Tiếp
        </button>
      </div>
    </div>
  `
})
export class FCStepperComponent implements AfterContentInit {
  @ContentChildren(FCStepComponent) steps!: QueryList<FCStepComponent>;
  @Input() currentStep: number = 0;
  @Input() showNavigation: boolean = true;
  @Output() currentStepChange = new EventEmitter<number>();

  ngAfterContentInit() {
    this.updateSteps();
  }

  updateSteps() {
    this.steps.forEach((step, index) => {
      step.index = index;
      step.active = index === this.currentStep;
      step.completed = index < this.currentStep;
    });
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateSteps();
      this.currentStepChange.emit(this.currentStep);
    }
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateSteps();
      this.currentStepChange.emit(this.currentStep);
    }
  }
} 