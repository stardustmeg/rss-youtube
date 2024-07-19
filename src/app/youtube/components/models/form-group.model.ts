import { FormArray, FormControl } from '@angular/forms';

export interface FormData {
  creationDate: FormControl<null | string>;
  description: FormControl<null | string>;
  imageLink: FormControl<null | string>;
  tags: FormArray;
  title: FormControl<null | string>;
  videoLink: FormControl<null | string>;
}
