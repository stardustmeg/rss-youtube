import { FakeAuthTokenService } from '@/app/auth/services/auth-token/fake-auth-token.service';
import { addCustomCard } from '@/app/redux/actions/actions';
import { selectCustomCards } from '@/app/redux/selectors/selectors';
import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { appRoute } from '@/app/shared/constants/routes';
import { userMessage } from '@/app/shared/services/snackBar/constants/user-message';
import { SnackBarService } from '@/app/shared/services/snackBar/snack-bar.service';
import { stringTemplate } from '@/app/shared/utils/string-template';
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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { VideoItem } from '../../models/video-item.model';
import { FormData } from '../models/form-group.model';
import { TagsFormComponent } from '../tags-form/tags-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CustomButtonComponent,
    MatStepperModule,
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

  private router = inject(Router);

  private snackBar = inject(SnackBarService);

  private store = inject(Store);

  @ViewChild(TagsFormComponent) private tagsFormComponent!: TagsFormComponent;

  private token = inject(FakeAuthTokenService);

  public formGroup: FormGroup<FormData>;

  public maxDate = new Date();

  public videos$ = this.store.select(selectCustomCards);

  constructor() {
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
    const tags = this.tagsFormComponent?.getNewVideoTags() ?? [];
    this.setVideoTags(tags);
    const videoId = this.token.generateToken();
    const videoDate = new Date(this.formGroup.get('creationDate')?.value ?? '');

    const newCard: VideoItem = {
      id: {
        kind: 'custom#card',
        videoId,
      },
      kind: 'custom#card',
      snippet: {
        description: this.formGroup.get('description')?.value ?? '',
        publishedAt: videoDate.toISOString(),
        tags: this.tagsFormComponent?.getNewVideoTags() ?? [],
        thumbnails: {
          default: {
            url: this.formGroup.get('videoLink')?.value ?? '',
          },
          high: {
            url: this.formGroup.get('imageLink')?.value ?? '',
          },
        },
        title: this.formGroup.get('title')?.value ?? '',
      },
      statistics: {
        commentCount: '0',
        dislikeCount: '0',
        likeCount: '0',
        viewCount: '0',
      },
    };

    this.store.dispatch(addCustomCard({ card: newCard }));
    this.snackBar.openSnackBar(stringTemplate(userMessage.CARD_ADDED, { title: newCard.snippet.title }));
    this.router.navigate([appRoute.MAIN]);
  }

  public reset(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.formGroup.reset();
    this.myStepper.reset();
    this.tagsFormComponent.reset();
  }

  public setVideoTags(tags: string[]): void {
    const tagsFormArray = this.formGroup.get('tags');
    if (tagsFormArray instanceof FormArray) {
      tagsFormArray.clear();
      tags.forEach((tag) => tagsFormArray.push(this.formBuilder.control(tag)));
    }
  }
}
