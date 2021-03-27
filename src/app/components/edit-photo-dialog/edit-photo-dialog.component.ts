import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GiphyService } from '../../services/giphy-service/giphy.service';
import { ImageService } from '../../services/image-service/image.service';
import { EditPhotoSpinnerService } from '../../services/spinner-services/edit-photo-spinner/edit-photo-spinner.service';
import { EditPhoto, GiphyContent } from '../../interfaces/data';
import { debounceTime } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'edit-photo-dialog',
  templateUrl: './edit-photo-dialog.component.html',
  styleUrls: ['./edit-photo-dialog.component.scss'],
  providers: [],
})
export class EditPhotoDialogComponent implements OnInit {
  @Input() photo_type: string = 'profile'; // can be -> background, profile
  @Output() event = new EventEmitter<EditPhoto>();

  // VARIABLE - Tab
  selected_tab: string = 'explore-tab';

  // VARIABLE - explore section
  @ViewChild('input') input;
  search_text: string = '';
  gifs: GiphyContent[];
  stickers: GiphyContent[];
  gifs_loading: boolean = false;
  stickers_loading: boolean = false;
  selected_content_url: string = undefined;

  // VARIABLE - custom image upload
  file_uploaded: boolean = false;
  uploaded_file_is_gif: boolean;
  uploaded_gif: any;
  image_for_cropper: any;
  custom_image: any;
  image_cropping_loading: boolean = false;
  cropped_image_value; // just created for ng binding
  compressed_image_height_size = 1000;

  // VARIABLE - COMMON
  image_uploading: boolean = false;
  edit_photo_loading_subscription: Subscription;

  constructor(
    private giphyService: GiphyService,
    private imageService: ImageService,
    private storageService: StorageService,
    private editPhotoSpinnerService: EditPhotoSpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // console.log('1: ', this.photo_type);
    this.init();
    this.startContentLoadings();
    this.getInitialContent();
  }

  init() {
    this.edit_photo_loading_subscription = this.editPhotoSpinnerService
      .getSpinner()
      .subscribe((state) => {
        this.image_uploading = state;
        // if false -> clean the dialog
        if (this.image_uploading == false) {
          this.cleanDialog();
        }

        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.edit_photo_loading_subscription.unsubscribe();
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

  selectTab(tab) {
    this.selected_tab = tab;
  }

  confirm() {
    this.image_uploading = true;

    let edit_photo_object = {
      confirmed: true,
    };

    // both gif selected and image uploaded
    if (this.custom_image && this.selected_content_url) {
      if (this.selected_tab === 'explore-tab') {
        edit_photo_object['url'] = this.selected_content_url;
        this.event.emit(edit_photo_object);
      } else {
        this.storageService.giveFileAndGetUrl(this.custom_image).then((url) => {
          edit_photo_object['url'] = url;
          this.event.emit(edit_photo_object);
        });
      }
    }
    // just image uploaded
    else if (this.custom_image) {
      this.storageService.giveFileAndGetUrl(this.custom_image).then((url) => {
        edit_photo_object['url'] = url;
        this.event.emit(edit_photo_object);
      });
    }
    // just gif selected
    else if (this.selected_content_url) {
      edit_photo_object['url'] = this.selected_content_url;
      this.event.emit(edit_photo_object);
    } else {
      // show select something error - or maybe not
      this.image_uploading = false;
      // console.log('secilmemis hicbisey');
    }
  }

  cancel() {
    this.cleanDialog();
    this.event.emit({ confirmed: false });
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
    var selected_radio = document.getElementById(
      content.images.fixed_height.url
    );

    if (this.selected_content_url === content.images?.fixed_height?.url) {
      selected_radio['checked'] = false;
      this.selected_content_url = undefined;
    } else {
      this.selected_content_url = content.images?.fixed_height?.url;
    }
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

    if (file) {
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
  }

  showUploadedGif(file) {
    this.custom_image = file;
    const reader = new FileReader();
    reader.onload = (e) => (this.uploaded_gif = reader.result);
    reader.readAsDataURL(file);
  }

  // CROPPING FUNCTİONS
  async imageCropped(event: ImageCroppedEvent) {
    this.stopImageCroppingLoading();
    const url = event.base64;

    this.custom_image = await this.imageService.base64ToFile(url);
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
    this.custom_image = undefined;
    this.image_cropping_loading = false;
  }

  // HELPER - COMMON functions
  cleanDialog() {
    this.selected_tab = 'explore-tab';
    window.document.getElementById('explore-tab')['checked'] = true;

    this.search_text = '';
    this.getInitialContent();
    // gifs: GiphyContent[];
    // stickers: GiphyContent[];
    // this.gifs_loading = false;
    // this.stickers_loading = false;
    this.selected_content_url = undefined;

    // VARIABLE - custom image upload
    this.file_uploaded = false;
    this.uploaded_file_is_gif = undefined;
    this.uploaded_gif = undefined;
    this.image_for_cropper = undefined;
    this.custom_image = undefined;
    this.image_cropping_loading = false;
  }
}
