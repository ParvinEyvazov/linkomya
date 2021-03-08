import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif, Sticker } from '../../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  API_KEY = 'OseukRU47oPpVHxynLs6Ma9x6H3CI8Yw';
  anonymous_header = { headers: { Anonymous: '' } };

  constructor(private http: HttpClient) {}

  getCustomGifs(search_text): Observable<Gif[]> {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${search_text}`;
    return this.http.get<Gif[]>(url, this.anonymous_header);
  }

  getCustomStickers(search_text): Observable<Sticker[]> {
    let url = `https://api.giphy.com/v1/stickers/search?api_key=${this.API_KEY}&q=${search_text}`;
    return this.http.get<Sticker[]>(url, this.anonymous_header);
  }

  getTrendingGifs(): Observable<Gif[]> {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${this.API_KEY}`;
    return this.http.get<Gif[]>(url, this.anonymous_header);
  }

  getTrendingStickers(): Observable<Sticker[]> {
    const url = `https://api.giphy.com/v1/stickers/trending?api_key=${this.API_KEY}`;
    return this.http.get<Sticker[]>(url, this.anonymous_header);
  }
}
