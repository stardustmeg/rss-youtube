import { CustomButtonComponent } from '@/app/shared/components/custom-button/custom-button.component';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { UserComponent } from './components/user/user.component';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SearchComponent,
    SortComponent,
    UserComponent,
    CustomButtonComponent,
  ],
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isSortVisible = false;

  handleKeyAction(): void {
    this.isSortVisible = !this.isSortVisible;
  }

  toggleSortVisibility(): void {
    this.isSortVisible = !this.isSortVisible;
  }
}
