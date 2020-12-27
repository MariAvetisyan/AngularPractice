import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControlResult} from './custom-types/form-contorl';
import {DynamicFormsBuilderService} from './dynamic-forms-builder.service';
import {HelperService} from './helper.service';

@Component({
  selector: 'app-dynamic-forms-builder',
  templateUrl: './dynamic-forms-builder.component.html',
  styleUrls: ['./dynamic-forms-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsBuilderComponent {
  formControls$ = this.dynamicFormService.formBuilderWithResult$;

  constructor(private dynamicFormService: DynamicFormsBuilderService) {
  }

  getControlResult(result: FormControlResult) {
    this.dynamicFormService.getControlResult(result);
  }

  sendData(): void {
    this.formControls$ = HelperService.validation(this.dynamicFormService.formBuilderWithResult$);
    if(HelperService.isDataValid(this.formControls$)) {
      this.dynamicFormService.sendData(this.formControls$);
    }
  }
}
