import {Component} from '@angular/core';
import {FormControl, FormControlResult} from '../custom-types/form-contorl';
import {DynamicFormsBuilderService} from '../dynamic-forms-builder.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ControlType} from '../custom-types/controls-types';
import {HelperService} from '../helper.service';

@Component({
  selector: 'app-add-new-control',
  templateUrl: './add-new-control.component.html',
  styleUrls: ['./add-new-control.component.scss']
})
export class AddNewControlComponent {

  private newControlUrl = 'api/formNewControl';

  newControl$: Observable<FormControl[]> = this.http.get<FormControl[]>(this.newControlUrl);

  private formNewControl: FormControl = {} as FormControl;

  controlResultSubject = new BehaviorSubject<FormControlResult>(null);
  controlResultAction$ = this.controlResultSubject.asObservable();

  newControlWithResult$ = HelperService.combineControlsWithResults(this.newControl$, this.controlResultAction$);

  constructor(private http: HttpClient,
              private dynamicFormService: DynamicFormsBuilderService,
              private router: Router) { }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);

    switch (result.id) {
      case 'new-control-type':
        this.formNewControl.type = ControlType[result.value.toUpperCase()];
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
      case 'new-control-control-option':
        this.formNewControl.controlOptions = result.value.split(', ');
        break;
      case 'new-control-required':
        this.formNewControl.isRequired = result.value === 'Yes';
        break;
    }
  }

  addControl(): void {
    this.newControlWithResult$ = HelperService.validation(this.newControlWithResult$);

    if(HelperService.isDataValid(this.newControlWithResult$)) {
      this.dynamicFormService.addNewControl(this.formNewControl);
      this.router.navigateByUrl('/form-builder');
    }
  }
}
