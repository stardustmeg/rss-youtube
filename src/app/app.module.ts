import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormBuilder,
  // FormsModule, ReactiveFormsModule
} from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';

import AppComponent from './app.component';
import { routes } from './app.routes';
// import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
// import { YoutubeModule } from './youtube/youtube.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [RouterOutlet, AppComponent, RouterOutlet],
  imports: [
    CommonModule,
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatIconModule,
    // MatButtonModule,
    // FormBuilder,
    CoreModule,
    RouterOutlet,
    SharedModule,
    // AuthModule,
    // YoutubeModule,
    RouterModule.forRoot(routes),
  ],
  providers: [FormBuilder, RouterOutlet],
})
export class AppModule {}
