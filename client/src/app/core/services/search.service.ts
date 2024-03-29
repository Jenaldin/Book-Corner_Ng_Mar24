import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchParams!: { [key: string]: any };
  private _searchResults: any;

  get searchParams(): any {
    return this._searchParams;
  }

  set searchParams(params: any) {
    this._searchParams = params;
  }

  get searchResults(): any {
    return this._searchResults;
  }

  set searchResults(results: any) {
    this._searchResults = results;
  }
}
