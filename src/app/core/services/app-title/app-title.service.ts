import { APP_TITLE } from '@/app/shared/constants/routes';
import { stringTemplate } from '@/app/shared/utils/string-template';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppTitleService extends TitleStrategy {
  private constructor(private readonly title: Title) {
    super();
  }

  public override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(stringTemplate(APP_TITLE, { title: title.toUpperCase() }));
    }
  }
}
