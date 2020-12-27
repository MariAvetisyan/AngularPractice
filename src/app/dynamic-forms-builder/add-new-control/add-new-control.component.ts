import {Component} from '@angular/core';
import {FormControl, FormControlResult} from '../custom-types/form-contorl';
import {DynamicFormsBuilderService} from '../dynamic-forms-builder.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ControlType} from '../custom-types/controls-types';
import {HelperService} from '../helper.service';

@Component({
  selector: 'app-add-new-control',
  templateUrl: './add-new-control.component.html',
  styleUrls: ['./add-new-control.component.scss']
})
export class AddNewControlComponent {

  private addNewControlUrl = 'api/formNewControl';

  addNewControl$: Observable<FormControl[]> = this.http.get<FormControl[]>(this.addNewControlUrl);

  private formControl: FormControl = {
    type: undefined,
    id: undefined,
    label: undefined,
    placeholder: undefined,
    isRequired: undefined,
    controlOptions: undefined,
  };

  controlResultSubject = new BehaviorSubject<FormControlResult>(null);
  controlResultAction$ = this.controlResultSubject.asObservable();

  newControlWithResult$ = HelperService.combineControlsWithResults(this.addNewControl$, this.controlResultAction$);

  constructor(private http: HttpClient,
              private dynamicFormService: DynamicFormsBuilderService,
              private router: Router) { }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);

    switch (result.id) {
      case 'new-control-type':
        this.formControl.type = ControlType[result.value.toUpperCase()];
        break;
      case 'new-control-id':
        this.formControl.id = result.value;
        break;
      case 'new-control-label':
        this.formControl.label = result.value;
        break;
      case 'new-control-placeholder':
        this.formControl.placeholder = result.value;
        break;
      case 'new-control-control-option':
        this.formControl.controlOptions = result.value.split(', ');
        break;
      case 'new-control-required':
        this.formControl.isRequired = result.value === 'Yes';
        break;
    }
  }

  addControl(): void {
    this.newControlWithResult$ = HelperService.validation(this.newControlWithResult$);

    if(HelperService.isDataValid(this.newControlWithResult$)) {
      this.dynamicFormService.addNewControl(this.formControl);
      this.router.navigateByUrl('/form-builder');
    }
  }
}
