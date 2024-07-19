import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { snackBarAction } from '@/app/shared/components/snack-bar/constants/actions';
import { SnackBarComponent } from '@/app/shared/components/snack-bar/snack-bar.component';
import { validNumber } from '@/app/shared/validators/constants/limits';
import { isFutureDate } from '@/app/shared/validators/validators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

import { FormData } from '../models/form-group.model';
import { TagsFormComponent } from '../tags-form/tags-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CustomButtonComponent,
    MatStepperModule,
    SnackBarComponent,
    FormsModule,
    TagsFormComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatError,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    provideNativeDateAdapter(),
    DatePipe,
  ],
  selector: 'app-new-video-item-form',
  standalone: true,
  styleUrl: './new-video-item-form.component.scss',
  templateUrl: './new-video-item-form.component.html',
})
export class NewVideoItemFormComponent {
  private formBuilder = inject(FormBuilder);

  @ViewChild('stepper') private myStepper!: MatStepper;

  private snackBar = new SnackBarComponent();

  @ViewChild(TagsFormComponent) private tagsFormComponent!: TagsFormComponent;

  public formGroup: FormGroup<FormData>;

  public maxDate = new Date();

  public constructor() {
    this.formGroup = this.formBuilder.group({
      creationDate: ['', [Validators.required, isFutureDate]],
      description: ['', Validators.maxLength(validNumber.MAX_DESCRIPTION)],
      imageLink: ['', [Validators.required]],
      tags: this.formBuilder.array([]),
      title: [
        '',
        [Validators.required, Validators.minLength(validNumber.MIN_TITLE), Validators.maxLength(validNumber.MAX_TITLE)],
      ],
      videoLink: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const tags = this.tagsFormComponent?.getTags() ?? [];
    this.setTags(tags);

    // TBD: use data to create a new card
    this.snackBar.openSnackBar(
      `Your video has been created ${JSON.stringify(this.formGroup.value)}`,
      snackBarAction.CHECK,
    );
  }

  public reset(event: Event): void {
    event.preventDefault();
    this.formGroup.reset();
    this.myStepper.reset();
    this.tagsFormComponent.reset();
  }

  public setTags(tags: string[]): void {
    const tagsFormArray = this.formGroup.get('tags');
    if (tagsFormArray instanceof FormArray) {
      tagsFormArray.clear();
      tags.forEach((tag) => tagsFormArray.push(this.formBuilder.control(tag)));
    }
  }
}
