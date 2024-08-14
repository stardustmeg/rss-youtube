import { FormArray, FormControl } from '@angular/forms';

export interface FormData {
  creationDate: FormControl<string>;
  description: FormControl<string>;
  imageLink: FormControl<string>;
  tags: FormArray;
  title: FormControl<string>;
  videoLink: FormControl<string>;
}
