import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  ErrorMessages = {
    email_validation: 'Invalid Email address',
    password_validation: 'Password must be at least 6 characters',
    previous_password_validation:
      'Previous password must be at least 6 characters',
    previous_and_new_password_matched:
      'New password cannot be same with previous password.',
    password_not_same: 'Passwords are not same',
    fullname_validation: 'Full name must be at least 1 character',
    username_validation: 'Username with non valid characters.',
    used_username: 'This username is already taken or forbidden word.',
    wrong_link_type: 'This is not a valid url.',
    wrong_file_type: "The file type doesn't match.",
    cannot_upload_file: 'File cannot be uploaded.',
    image_not_selected_error: 'Please select or upload a new file.',
    image_compress_error:
      'Error occurs while compressing file. Please select different file.',
  };

  SuccessMessages = {};

  constructor() {}
}
