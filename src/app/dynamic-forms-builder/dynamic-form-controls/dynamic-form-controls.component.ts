import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlType} from '../custom-types/controls-types';
import {FormControlResult} from '../custom-types/form-contorl';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-controls.component.html',
  styleUrls: ['./dynamic-form-controls.component.scss'],
  template: `<app-dynamic-form-control [type]="type"
                                       [id]="id"
                                       [label]="label"
                                       [placeholder]="placeholder"
                                       [isRequired]="isRequired"
                                       [hint]="hint"
                                       [controlOptions]="controlOptions">
             </app-dynamic-form-control>`

})

export class DynamicFormControlsComponent {
  value: any;
  @Output() controlResultEmitter = new EventEmitter<FormControlResult>();

  @Input() type: ControlType;
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() isRequired: boolean;
  @Input() controlOptions: any[];
  @Input() hint: string;

  public controlType = ControlType;

  constructor() { }

  sendControlResult() {
    const result: FormControlResult = {type: this.type, id: this.id, value: this.value};

    this.controlResultEmitter.emit(result);
  }

  selectButton(value: string) {
    if (this.type === this.controlType.CHECKBOX) {
      if (this.value) {
        this.value.push(value);
      } else {
        this.value = value.split(' ');
      }
    } else {
      this.value = value;
    }
  }
}
