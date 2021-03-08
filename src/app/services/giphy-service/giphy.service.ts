import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GiphyContent } from '../../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  API_KEY = 'OseukRU47oPpVHxynLs6Ma9x6H3CI8Yw';
  anonymous_header = { headers: { Anonymous: '' } };

  constructor(private http: HttpClient) {}

  getCustomGifs(search_text): Observable<GiphyContent[]> {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${search_text}`;
    return this.http.get<GiphyContent[]>(url, this.anonymous_header);
  }

  getCustomStickers(search_text): Observable<GiphyContent[]> {
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${this.API_KEY}&q=${search_text}`;
    return this.http.get<GiphyContent[]>(url, this.anonymous_header);
  }

  getTrendingGifs(): Observable<GiphyContent[]> {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${this.API_KEY}`;
    return this.http.get<GiphyContent[]>(url, this.anonymous_header);
  }

  getTrendingStickers(): Observable<GiphyContent[]> {
    const url = `https://api.giphy.com/v1/stickers/trending?api_key=${this.API_KEY}`;
    return this.http.get<GiphyContent[]>(url, this.anonymous_header);
  }
}
