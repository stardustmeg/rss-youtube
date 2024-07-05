import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, ButtonComponent],
  selector: 'app-search',
  standalone: true,
  styleUrl: './search.component.scss',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  value = 'Clear me';
}
