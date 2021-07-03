import { Injectable } from '@angular/core';
import * as SpicaStorage from '@spica-devkit/storage';
import { environment } from '../../../environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private messageService: MessageService) {
    SpicaStorage.initialize({
      apikey: environment.public_api_key,
      publicUrl: environment.url,
    });
  }

  giveFileAndGetUrl(file) {
    return new Promise(async (resolve, reject) => {
      if (file.type.match(/image\/*/) == null) {
        reject(this.messageService.ErrorMessages.wrong_file_type);
      } else {
        await SpicaStorage.insert(file)
          .then((data) => {
            resolve(data[0].url);
          })
          .catch((error) => {
            reject(this.messageService.ErrorMessages.cannot_upload_file);
          });
      }
    });
  }
}
