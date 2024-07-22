import { validNumber } from '@/app/shared/validators/constants/limits';
import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { PLACEHOLDER_TEXT } from './constants/placeholderText';

@Component({
  imports: [MatChipsModule, FormsModule, MatError, ReactiveFormsModule, MatFormFieldModule, MatIconModule],
  selector: 'app-tags-form',
  standalone: true,
  styleUrl: './tags-form.component.scss',
  templateUrl: './tags-form.component.html',
})
export class TagsFormComponent {
  private formBuilder = inject(FormBuilder);

  public readonly addOnBlur = true;

  public isNewVideoTagsArrayFull = signal<boolean>(false);

  public readonly maxTags = validNumber.MAX_TAGS;

  public readonly newVideoTags = signal<string[]>([]);

  @Output() public tagsChange = new EventEmitter<string[]>();

  public tagsFormGroup = this.formBuilder.group({
    tags: this.formBuilder.array([]),
  });

  public constructor() {}

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.newVideoTags().find((tag) => tag === value) && this.newVideoTags().length < this.maxTags) {
      this.newVideoTags.update((tags) => [...tags, value]);
      this.isNewVideoTagsArrayFull.set(false);
      this.tagsChange.emit(this.getNewVideoTags());
    }
    if (this.newVideoTags().length >= this.maxTags) {
      this.isNewVideoTagsArrayFull.set(true);
    }
    event.chipInput.clear();
  }

  public edit(tag: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    this.newVideoTags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        const currentTags = tags;
        currentTags[index] = value;
        this.tagsChange.emit([...currentTags]);
        return [...currentTags];
      }
      return tags;
    });
  }

  public getNewVideoTags(): string[] {
    return this.newVideoTags();
  }

  public getNewVideoTagsLength(): number {
    return this.newVideoTags().length;
  }

  public remove(tag: string): void {
    this.newVideoTags.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.tagsChange.emit([...tags]);
      return [...tags];
    });
    if (this.newVideoTags().length < this.maxTags) {
      this.isNewVideoTagsArrayFull.set(false);
    }
  }

  public reset(): void {
    this.newVideoTags.set([]);
    this.isNewVideoTagsArrayFull.set(false);
    this.tagsChange.emit([]);
  }

  public get placeholderText(): string {
    return this.isNewVideoTagsArrayFull() ? '' : PLACEHOLDER_TEXT;
  }
}
