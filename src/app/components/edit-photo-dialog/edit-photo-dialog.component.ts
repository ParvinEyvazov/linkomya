import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from '../../services/giphy-service/giphy.service';
import { Gif, Sticker } from '../../interfaces/data';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'edit-photo-dialog',
  templateUrl: './edit-photo-dialog.component.html',
  styleUrls: ['./edit-photo-dialog.component.scss'],
})
export class EditPhotoDialogComponent implements OnInit {
  @ViewChild('input') input;

  search_text: string = '';

  gifs: Gif[];
  stickers: Sticker[];

  gifs_loading: boolean = false;
  stickers_loading: boolean = false;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.startContentLoadings();
    this.getInitialContent();
  }

  ngAfterViewInit(): void {
    this.input.update.pipe(debounceTime(500)).subscribe((value) => {
      if (value) {
        this.cleanAllContent();
        this.startContentLoadings();
        this.getCustomContent(value);
      } else {
        //getting initial content
        this.cleanAllContent();
        this.startContentLoadings();
        this.getInitialContent();
      }
    });
  }

  getInitialContent() {
    this.getTrendingGifs();
    this.getTrendingStickers();
  }

  getCustomContent(search_text) {
    console.log('getting custom', search_text);
    this.getCustomGifs(search_text);
    this.getCustomStickers(search_text);
  }

  // Trending - Initial content
  getTrendingGifs() {
    this.giphyService
      .getTrendingGifs()
      .toPromise()
      .then((data: Gif[]) => {
        if (data) {
          this.gifs = data;
          this.stopGifsLoading();
        }
      });
  }

  getTrendingStickers() {
    this.giphyService
      .getTrendingStickers()
      .toPromise()
      .then((data) => {
        if (data) {
          this.stickers = data;
          this.stopStickersLoading();
        }
      });
  }

  // Custom content
  getCustomGifs(search_text) {
    this.giphyService
      .getCustomGifs(search_text)
      .toPromise()
      .then((data) => {
        this.gifs = data;
        this.stopGifsLoading();
      });
  }

  getCustomStickers(search_text) {
    this.giphyService
      .getCustomStickers(search_text)
      .toPromise()
      .then((data) => {
        this.stickers = data;
        this.stopStickersLoading();
      });
  }

  // call it when new text written
  cleanAllContent() {
    this.gifs = undefined;
    this.stickers = undefined;
  }

  startContentLoadings() {
    this.gifs_loading = true;
    this.stickers_loading = true;
  }

  stopGifsLoading() {
    this.gifs_loading = false;
  }

  stopStickersLoading() {
    this.stickers_loading = false;
  }
}
