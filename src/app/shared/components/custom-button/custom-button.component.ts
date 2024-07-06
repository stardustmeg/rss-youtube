import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule],
  selector: 'app-custom-button',
  standalone: true,
  styleUrl: './custom-button.component.scss',
  templateUrl: './custom-button.component.html',
})
export class CustomButtonComponent {
  @Input() attributeType: 'mat-fab' | 'mat-icon-button' | 'mat-mini-fab' | 'mat-raised-button' =
    'mat-raised-button';

  @Input() customClass = '';

  @Input() defaultClass = 'button';

  @Input() defaultFabClass = 'fab-button';

  @Input() defaultIconClass = 'icon-button';

  @Input() defaultMiniFabClass = 'mini-fab-button';

  @Input() defaultRaisedClass = 'raised-button';

  @Input() icon = '';
}
