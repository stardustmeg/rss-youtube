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

  public isTagArrayFull = signal<boolean>(false);

  public readonly maxTags = validNumber.MAX_TAGS;

  public readonly tagArray = signal<string[]>([]);

  @Output() public tagsChange = new EventEmitter<string[]>();

  public tagsFormGroup = this.formBuilder.group({
    tags: this.formBuilder.array([]),
  });

  public constructor() {}

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tagArray().find((tag) => tag === value) && this.tagArray().length < this.maxTags) {
      this.tagArray.update((tags) => [...tags, value]);
      this.isTagArrayFull.set(false);
      this.tagsChange.emit(this.getTags());
    }
    if (this.tagArray().length >= this.maxTags) {
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
        this.tagsChange.emit([...currentTags]);
        return [...currentTags];
      }
      return tags;
    });
  }

  public getTagArrayLength(): number {
    return this.tagArray().length;
  }

  public getTags(): string[] {
    return this.tagArray();
  }

  public remove(tag: string): void {
    this.tagArray.update((tags) => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.tagsChange.emit([...tags]);
      return [...tags];
    });
    if (this.tagArray().length < this.maxTags) {
      this.isTagArrayFull.set(false);
    }
  }

  public reset(): void {
    this.tagArray.set([]);
    this.isTagArrayFull.set(false);
    this.tagsChange.emit([]);
  }

  public get placeholderText(): string {
    return this.isTagArrayFull() ? '' : PLACEHOLDER_TEXT;
  }
}
