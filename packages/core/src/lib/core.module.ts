import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validation } from './models/validation.model';
import { ValidationErrorComponent } from './components/validation-error.component';
import { BLUEPRINTS } from './constants/blueprints';
import { defaultMapErrorsFn } from './utils/mappers';
import { AbstractValidationDirective } from './abstracts/abstract-validation.directive';
import { ValidationGroupDirective } from './directives/validation-group.directive';
import { ValidationTargetDirective } from './directives/validation-target.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ValidationGroupDirective, ValidationTargetDirective],
  declarations: [
    ValidationErrorComponent,
    AbstractValidationDirective,
    ValidationGroupDirective,
    ValidationTargetDirective,
  ],
  entryComponents: [ValidationErrorComponent],
})
export class NgxValidateCoreModule {
  static forRoot(config = {} as Validation.Config): ModuleWithProviders {
    return {
      ngModule: NgxValidateCoreModule,
      providers: [
        {
          provide: 'VALIDATION_CONFIG',
          useValue: {
            blueprints: config.blueprints || BLUEPRINTS,
            errorTemplate: config.errorTemplate || ValidationErrorComponent,
            invalidClasses: config.invalidClasses || 'is-invalid',
            mapErrorsFn: config.mapErrorsFn || defaultMapErrorsFn,
            targetSelector: config.targetSelector,
            validateOnSubmit: config.validateOnSubmit,
          },
        },
      ],
    };
  }
}
