import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControlResult} from './custom-types/form-contorl';
import {DynamicFormsBuilderService} from './dynamic-forms-builder.service';
import {HelperService} from './helper.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface removeControlDialogData {
  id: string;
}

@Component({
  selector: 'app-dynamic-forms-builder',
  templateUrl: './dynamic-forms-builder.component.html',
  styleUrls: ['./dynamic-forms-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsBuilderComponent {
  formControls$ = this.dynamicFormService.formBuilderWithResult$;

  constructor(private dynamicFormService: DynamicFormsBuilderService,
              public dialog: MatDialog) {
  }

  getControlResult(result: FormControlResult) {
    this.dynamicFormService.getControlResult(result);
  }

  sendData(): void {
    this.formControls$ = HelperService.validation(this.dynamicFormService.formBuilderWithResult$);
    if(HelperService.isValidationError(this.formControls$)) {
      this.dynamicFormService.sendData(this.formControls$);
    }
  }

  removeControl(controlId: string) {
    const dialogRef = this.dialog.open(RemoveControlDialog, {
      width: '500px',
      data: {id: controlId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dynamicFormService.removeControl(controlId);
      }
    });
  }
}

@Component({
  selector: 'remove-control-dialog',
  template: `<h4>Do you really wanna delete <em>{{data.id}}</em> control?</h4>
           
             <div fxLayout="row" fxLayoutAlign="flex-end flex-end" class="remove-control-dialog__button-group">
              <button mat-raised-button (click)="onNoClick(true)">Yes</button>
              <button mat-raised-button color="primary" (click)="onNoClick(false)">No</button>
             </div>
                `,
  styleUrls: ['./dynamic-forms-builder.component.scss'],
})
export class RemoveControlDialog {

  constructor(public dialogRef: MatDialogRef<DynamicFormsBuilderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: removeControlDialogData) {
  }

  onNoClick(isRemove: boolean): void {
    this.dialogRef.close(isRemove);
  }

}
