import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  isValidImage(file) {
    return file['type'].split('/')[0] === 'image';
  }

  isGif(file) {
    return (
      file['type'].split('/')[1] === 'gif' ||
      file['type'].split('/')[1] === 'webp'
    );
  }

  async base64ToFile(base64_file) {
    let file: File;
    await fetch(base64_file)
      .then((res) => res.blob())
      .then((blob) => {
        file = new File([blob], 'user-profile-photo.png', {
          type: 'image/png',
        });
      });
    return file;
  }

  fileTobase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  compressImage(base64, height) {
    let ratio: number = 0;
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const elem = document.createElement('canvas');

        ratio = img.width / img.height;
        let width = height * ratio;
        elem.height = height;
        elem.width = width;

        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const data = ctx.canvas.toDataURL();
        res(data);
      };
      img.onerror = (error) => rej(error);
    });
  }
}
