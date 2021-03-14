import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from '../../services/giphy-service/giphy.service';
import { ImageService } from '../../services/image-service/image.service';
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
  uploaded_gif: any;
  image_for_cropper: any;
  cropped_image: any;
  image_cropping_loading: boolean = false;

  compressed_image_height_size = 1000;

  constructor(
    private giphyService: GiphyService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.startContentLoadings();
    this.getInitialContent();
  }

  ngAfterViewInit(): void {
    this.input.update.pipe(debounceTime(500)).subscribe((value) => {
      this.cleanAllContent();
      this.startContentLoadings();
      if (value) {
        this.getCustomContent(value);
      } else {
        this.getInitialContent();
      }
    });
  }

  confirm() {
    // send back just url
  }

  cancel() {
    // clean everything - gif search to images
  }

  //--EXPLORE PART
  getInitialContent() {
    this.getTrendingGifs();
    this.getTrendingStickers();
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

  getCustomContent(search_text) {
    this.getCustomGifs(search_text);
    this.getCustomStickers(search_text);
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
  async onFileUpload(event) {
    let file = event?.target?.files[0];

    if (this.imageService.isValidImage(file)) {
      this.uploaded_file_is_gif = this.imageService.isGif(file);

      /*
      Uploaded file is: 
        gif -> show gif
        not gif -> show cropper to crop the image
      */
      if (this.uploaded_file_is_gif) {
        this.file_uploaded = true;
        this.showUploadedGif(file);
      } else {
        this.startImageCroppingLoading();
        let base64 = await this.imageService.fileTobase64(file);
        this.imageService
          .compressImage(base64, this.compressed_image_height_size)
          .then(async (compressed_base64) => {
            let compressed_file = await this.imageService.base64ToFile(
              compressed_base64
            );
            this.image_for_cropper = { target: { files: [compressed_file] } };
            this.file_uploaded = true;
          });
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

  // CROPPING FUNCTİONS
  async imageCropped(event: ImageCroppedEvent) {
    this.stopImageCroppingLoading();
    const url = event.base64;

    this.cropped_image = await this.imageService.base64ToFile(url);
  }

  imageLoaded() {
    this.startImageCroppingLoading();
  }

  cropperReady() {
    this.stopImageCroppingLoading();
  }

  loadImageFailed() {
    // show error when failed to load
  }

  startCropImage() {
    this.startImageCroppingLoading();
  }

  startImageCroppingLoading() {
    this.image_cropping_loading = true;
  }

  stopImageCroppingLoading() {
    this.image_cropping_loading = false;
  }

  removeImage() {
    this.file_uploaded = false;
    this.uploaded_file_is_gif = undefined;
    this.uploaded_gif = undefined;
    this.image_for_cropper = undefined;
    this.cropped_image = undefined;
    this.image_cropping_loading = false;
  }

  // HELPER - COMMON functions
}
