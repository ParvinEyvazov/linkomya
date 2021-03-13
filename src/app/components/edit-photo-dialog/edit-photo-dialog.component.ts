import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from '../../services/giphy-service/giphy.service';
import { GiphyContent } from '../../interfaces/data';
import { debounceTime } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'edit-photo-dialog',
  templateUrl: './edit-photo-dialog.component.html',
  styleUrls: ['./edit-photo-dialog.component.scss'],
})
export class EditPhotoDialogComponent implements OnInit {
  // VARIABLE - explore section
  @ViewChild('input') input;
  search_text: string = '';
  gifs: GiphyContent[];
  stickers: GiphyContent[];
  gifs_loading: boolean = false;
  stickers_loading: boolean = false;
  selected_content_url: string;

  // VARIABLE - custom image upload
  file_uploaded: boolean = false;
  uploaded_file_is_gif: boolean;
  uploaded_gif;
  image_for_cropper: any = '';
  cropped_image: any = '';
  image_cropping_loading: boolean = true;

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

  //--EXPLORE PART
  getInitialContent() {
    this.getTrendingGifs();
    this.getTrendingStickers();
  }

  getCustomContent(search_text) {
    this.getCustomGifs(search_text);
    this.getCustomStickers(search_text);
  }

  getTrendingGifs() {
    this.giphyService
      .getTrendingGifs()
      .toPromise()
      .then((data) => {
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

  onContentSelected(content) {
    this.selected_content_url = content.images?.original?.url;
    console.log('selected:', this.selected_content_url);
  }

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

  //--CUSTOM IMAGE UPLOAD PART
  onFileUpload(event) {
    //let file = files_event[0];
    let file = event?.target?.files[0];

    console.log(file);
    console.log('is gif: ', this.isGif(file));

    if (this.isValidImage(file)) {
      this.uploaded_file_is_gif = this.isGif(file);
      this.file_uploaded = true;

      if (this.uploaded_file_is_gif) {
        this.showUploadedGif(file);
      } else {
        // show croppper
        this.image_for_cropper = event;
        console.log('image cropper', this.image_for_cropper);
      }
    } else {
      // show image is not valid
    }
  }

  showUploadedGif(file) {
    const reader = new FileReader();
    reader.onload = (e) => (this.uploaded_gif = reader.result);
    reader.readAsDataURL(file);
  }

  isValidImage(file) {
    return file['type'].split('/')[0] === 'image';
  }

  isGif(file) {
    return (
      file['type'].split('/')[1] === 'gif' ||
      file['type'].split('/')[1] === 'webp'
    );
  }

  // CROP FUNCTİONS
  imageCropped(event: ImageCroppedEvent) {
    // console.log('cropped');
    this.stopImageCroppingLoading();
    this.cropped_image = event;
  }

  imageLoaded() {
    // console.log('imageLoaded');
  }

  cropperReady() {
    // console.log('cropperReady');
  }

  loadImageFailed() {
    // console.log('loadImageFailed');
  }

  startCropImage() {
    this.startImageCroppingLoading();
    this.image_cropping_loading = true;
  }

  startImageCroppingLoading() {
    this.image_cropping_loading = true;
  }

  stopImageCroppingLoading() {
    this.image_cropping_loading = false;
  }
}
