import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private _page: number = 0;

  get page(): number {
    return this._page;
  }

  set page(page: number) {
    this._page = page;
  }
}
