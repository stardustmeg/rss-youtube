import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomLinkComponent } from './components/custom-link/custom-link.component';

@NgModule({
  declarations: [CustomButtonComponent, CustomLinkComponent],
  exports: [CustomButtonComponent, CustomLinkComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class SharedModule {}
