import {Component} from '@angular/core';
import {FormControl, FormControlResult} from '../custom-types/form-contorl';
import {DynamicFormsBuilderService} from '../dynamic-forms-builder.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {ControlType} from '../custom-types/controls-types';
import {HelperService} from '../helper.service';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-add-new-control',
  templateUrl: './add-new-control.component.html',
  styleUrls: ['./add-new-control.component.scss']
})
export class AddNewControlComponent {

  private newControlUrl = 'api/formNewControl';

  newControl$: Observable<FormControl[]> = this.http.get<FormControl[]>(this.newControlUrl);

  private formNewControl: FormControl = {} as FormControl;

  private optionalControl = {
      type: ControlType.INPUT,
      id: 'new-control-control-options',
      label: 'Control options',
      hint: 'Type options separate with comma and space',
      isRequired: true,
    };

  controlResultSubject = new BehaviorSubject<FormControlResult>(null);
  controlResultAction$ = this.controlResultSubject.asObservable();

  addOptionalControlSubject = new BehaviorSubject<FormControl>(null);
  addOptionalControlAction$ = this.addOptionalControlSubject.asObservable();

  optionalControlResultSubject = new BehaviorSubject<FormControlResult>(null);
  optionalControlResultAction$ = this.optionalControlResultSubject.asObservable();


  newControlWithResult$ = combineLatest([
    this.newControl$,
    this.controlResultAction$,
    this.addOptionalControlAction$,
    this.optionalControlResultAction$
  ]).pipe(
    map(([formBuilder, controlResult, addOptionalControl, optionalControlResult]) => {
      if (formBuilder.find(item => item.id == 'new-control-control-options')){
        formBuilder.pop();
      }

      if(optionalControlResult && addOptionalControl) {
        if (optionalControlResult.value == ControlType.RADIO || optionalControlResult.value == ControlType.CHECKBOX || optionalControlResult.value == ControlType.SELECT) {
          formBuilder.push(addOptionalControl);
        }
      }

      formBuilder.map(formControl => {
          if (controlResult && formControl.id === controlResult.id) {
            formControl.value = controlResult.value;
          }

          return formControl;
        }
      );

      return formBuilder;
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient,
              private dynamicFormService: DynamicFormsBuilderService,
              private router: Router) { }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);
    this.collectFormNewControl(result);
  }

  collectFormNewControl(result: FormControlResult): void {
    switch (result.id) {
      case 'new-control-type':
        this.formNewControl.type = ControlType[result.value.toUpperCase()];
        this.addOptionalControl(result);
        break;
      case 'new-control-id':
        this.formNewControl.id = result.value;
        break;
      case 'new-control-label':
        this.formNewControl.label = result.value;
        break;
      case 'new-control-placeholder':
        this.formNewControl.placeholder = result.value;
        break;
      case 'new-control-control-options':
        this.formNewControl.controlOptions = result.value.split(', ');
        break;
      case 'new-control-required':
        this.formNewControl.isRequired = result.value === 'Yes';
        break;
    }
  }

  addOptionalControl(result: FormControlResult) {
      this.optionalControlResultSubject.next(result);
      this.addOptionalControlSubject.next(this.optionalControl);
  }

  addControl(): void {
    this.newControlWithResult$ = HelperService.validation(this.newControlWithResult$);

    if(HelperService.isValidationError(this.newControlWithResult$)) {
      this.dynamicFormService.addNewControl(this.formNewControl);
      this.router.navigateByUrl('/form-builder');
    }
  }
}
