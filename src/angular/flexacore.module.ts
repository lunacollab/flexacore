import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FCButtonComponent } from './fc-button.component';
import { FCModalComponent } from './fc-modal.component';
import { FCToastComponent } from './fc-toast.component';
import { FCTabsComponent, FCTabComponent } from './fc-tabs.component';
import { FCSwitchComponent } from './fc-switch.component';
import { FCProgressComponent } from './fc-progress.component';
import { FCSkeletonComponent } from './fc-skeleton.component';
import { FCStepperComponent, FCStepComponent } from './fc-stepper.component';
import { FCFormComponent, FCFormGroupComponent } from './fc-form.component';
import { FCInputComponent } from './fc-input.component';
import { FCTextareaComponent } from './fc-textarea.component';
import { FCSelectComponent } from './fc-select.component';
import { FCBadgeComponent } from './fc-badge.component';
import { FCAlertComponent } from './fc-alert.component';
import { FCTooltipComponent } from './fc-tooltip.component';
import { FCDropdownComponent, FCDropdownItemComponent } from './fc-dropdown.component';
import { FCCardComponent } from './fc-card.component';

@NgModule({
  declarations: [
    FCButtonComponent,
    FCModalComponent,
    FCToastComponent,
    FCTabsComponent, FCTabComponent,
    FCSwitchComponent,
    FCProgressComponent,
    FCSkeletonComponent,
    FCStepperComponent, FCStepComponent,
    FCFormComponent, FCFormGroupComponent,
    FCInputComponent,
    FCTextareaComponent,
    FCSelectComponent,
    FCBadgeComponent,
    FCAlertComponent,
    FCTooltipComponent,
    FCDropdownComponent, FCDropdownItemComponent,
    FCCardComponent
  ],
  imports: [CommonModule],
  exports: [
    FCButtonComponent,
    FCModalComponent,
    FCToastComponent,
    FCTabsComponent, FCTabComponent,
    FCSwitchComponent,
    FCProgressComponent,
    FCSkeletonComponent,
    FCStepperComponent, FCStepComponent,
    FCFormComponent, FCFormGroupComponent,
    FCInputComponent,
    FCTextareaComponent,
    FCSelectComponent,
    FCBadgeComponent,
    FCAlertComponent,
    FCTooltipComponent,
    FCDropdownComponent, FCDropdownItemComponent,
    FCCardComponent
  ]
})
export class FlexaCoreModule {
  static forRoot(): ModuleWithProviders<FlexaCoreModule> {
    return {
      ngModule: FlexaCoreModule,
      providers: []
    };
  }
} 