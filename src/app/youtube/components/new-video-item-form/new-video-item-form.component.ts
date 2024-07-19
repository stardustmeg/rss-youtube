import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { SnackBarComponent } from '@/app/shared/components/snack-bar/snack-bar.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CustomButtonComponent,
    SnackBarComponent,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatError,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    provideNativeDateAdapter(),
  ],
  selector: 'app-new-video-item-form',
  standalone: true,
  styleUrl: './new-video-item-form.component.scss',
  templateUrl: './new-video-item-form.component.html',
})
export class NewVideoItemFormComponent {
  private formBuilder = inject(FormBuilder);

  public readonly addOnBlur = true;

  public creationDateFormGroup = this.formBuilder.group({
    date: ['', [Validators.required]],
  });

  public descriptionFormGroup = this.formBuilder.group({
    description: [''],
  });

  public formGroup: FormGroup;

  public imageLinkFormGroup = this.formBuilder.group({
    imageLink: ['', [Validators.required]],
  });

  public isTagArrayFull = signal<boolean>(false);

  public maxDate: Date;

  public readonly tagArray = signal<string[]>([]);

  public tagsFormGroup = this.formBuilder.group({
    tags: [['']],
  });

  public titleFormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
  });

  public videoLinkFormGroup = this.formBuilder.group({
    videoLink: ['', [Validators.required]],
  });

  public constructor() {
    this.formGroup = this.formBuilder.group({
      creationDate: this.creationDateFormGroup,
      description: this.descriptionFormGroup,
      imageLink: this.imageLinkFormGroup,
      tags: this.tagsFormGroup,
      title: this.titleFormGroup,
      videoLink: this.videoLinkFormGroup,
    });

    this.maxDate = new Date();
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tagArray().find((tag) => tag === value) && this.tagArray().length < 5) {
      this.tagArray.update((tags) => [...tags, value]);
      this.isTagArrayFull.set(false);
    }
    if (this.tagArray().length >= 5) {
      this.isTagArrayFull.set(true);
    }
    event.chipInput.clear();
  }

  public edit(tag: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    this.tagArray.update((tags) => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        const currentTags = tags;
        currentTags[index] = value;
        return [...tags];
      }
      return tags;
    });
  }

  public getTagArrayLength(): number {
    return this.tagArray().length;
  }

  public onSubmit(): void {
    this.tagsFormGroup.patchValue({ tags: [...this.tagArray()] });
    // eslint-disable-next-line no-console
    console.log(this.formGroup.value);
  }

  public remove(tag: string): void {
    this.tagArray.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      return [...tags];
    });
    if (this.tagArray().length < 5) {
      this.isTagArrayFull.set(false);
    }
  }

  public reset(): void {
    this.formGroup.reset();
    this.tagArray.set([]);
    this.isTagArrayFull.set(false);
  }

  public get placeholderText(): string {
    return this.isTagArrayFull() ? '' : 'New tag...';
  }
}
