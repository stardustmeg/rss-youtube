import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIcon, CustomButtonComponent],
  selector: 'app-filter',
  standalone: true,
  styleUrl: './filter.component.scss',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  inputValue = '';

  constructor() {}

  handleSubmit(): void {
    this.inputValue = '';
  }
}
