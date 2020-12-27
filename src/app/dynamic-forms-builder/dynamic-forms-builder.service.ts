import {Injectable} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {mergeMap, shareReplay} from 'rxjs/internal/operators';
import {HelperService} from './helper.service';

@Injectable({
  providedIn: 'root'
})

export class DynamicFormsBuilderService {
  private formBuilderUrl = 'api/formControls';

  formBuilder$: Observable<FormControl[]> = this.http.get<FormControl[]>(this.formBuilderUrl);

  private newControlSubject = new BehaviorSubject<FormControl>(null);
  newControlAction$ = this.newControlSubject.asObservable();

  private controlResultSubject = new BehaviorSubject<FormControlResult>(null);
  controlResultAction$ = this.controlResultSubject.asObservable();

  formBuilderWithResult$ = HelperService.combineControlsWithResults(this.getFormControlsWithNew(),  this.controlResultAction$);

  constructor(private http: HttpClient) {
  }

  getFormControlsWithNew(): Observable<FormControl[]> {
    return this.formBuilder$ = this.formBuilder$.pipe(
      mergeMap(formBuilder => {
          return this.newControlAction$.pipe(map(newControl => {
            if(newControl) {
              return [...formBuilder, newControl]
            }

            return formBuilder;
          }))
        }
      ),
      shareReplay(1));
  }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);
  }

  addNewControl(newControl: FormControl) {
    this.newControlSubject.next(newControl);
  }

  sendData(formControls$: Observable<FormControl[]>) {
    console.log('Data received: ');
    formControls$.subscribe(item => console.log(item));
    return this.http.post<Observable<FormControl[]>>(this.formBuilderUrl, formControls$);
  }
}


