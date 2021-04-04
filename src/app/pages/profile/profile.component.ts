import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from '../../services/user-services/user.service';
import { ApiService } from '../../services/api-services/api.service';

import { Connection, User } from '../../interfaces/data';
import { ValidationService } from 'src/app/services/validation.service';
import { MessageService } from 'src/app/services/message.service';
import { MicroService } from 'src/app/services/micro-services/micro.service';
import { environment } from '../../../environments/environment';
import { PageSpinnerService } from 'src/app/services/spinner-services/page-spinner/page-spinner.service';
import { EditPhotoSpinnerService } from 'src/app/services/spinner-services/edit-photo-spinner/edit-photo-spinner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  new_user: boolean;

  //-------NEW USER
  @ViewChild('input') input;
  username: string;
  username_error: string;
  username_check_error: boolean = false;
  username_check_loading: boolean = false;
  username_check_success: boolean = false;

  //--------NON-NEW USER
  edit_open: boolean = false;
  user: User;
  user_id: string;
  profile_photo_loading = false;
  profile_photo_error: string = '';
  background_photo_loading = false;
  background_photo_error: string = '';

  // -add new connection
  connections: Connection[];

  //-edit connection link
  editing_connection_id: string;
  editing_connection: Connection;

  //dialog states
  dialog_state_edit_connection: boolean = false;
  dialog_state_add_connection: boolean = false;
  dialog_state_edit_profile_photo: boolean = false;
  dialog_state_edit_background_photo: boolean = false;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private microService: MicroService,
    private pageSpinnerService: PageSpinnerService,
    private editPhotoSpinnerService: EditPhotoSpinnerService
  ) {}

  ngOnInit(): void {
    this.user_id = this.userService.getUserId();
    this.getUser(this.user_id);
  }

  //-------------------------NEW USER------------------------
  assignUsername(event) {
    if (event === true) {
      this.getUser(this.user_id);
    }
  }

  //------------------------NON NEW USER------------------------
  //--ADD NEW CONNECTION
  closeAddConnectionDialog(event) {
    if (event == true) {
      this.getConnections(this.user_id);
      this.closeAddNewConnectionDialog();
    } else {
      this.closeAddNewConnectionDialog();
    }
  }

  closeAddNewConnectionDialog() {
    this.dialog_state_add_connection = false;
  }

  //--EDIT CONNECTION LINK
  closeEditConnectionDialog(event) {
    if (event == true) {
      this.closeEditDialog();
      this.getConnections(this.user_id);
    } else {
      this.closeEditDialog();
    }
  }

  changeEditState() {
    this.edit_open = !this.edit_open;
  }

  closeEditDialog() {
    this.dialog_state_edit_connection = false;
  }

  openEditConnectionDialog(editing_connection_id: string) {
    this.editing_connection_id = editing_connection_id;
    this.editing_connection = this.getConnectionFromId(
      this.editing_connection_id
    );
  }

  // -- will be deleted after background upload
  uploadPhotoEvent(event, is_profile_photo) {
    if (!event.error) {
      this.getUser(this.user_id);
    } else {
      this.showPhotoError(event.error, is_profile_photo);
    }
  }

  openEditProfilePhotoDialog(open_event) {
    if (open_event == true) {
      this.dialog_state_edit_profile_photo = true;
    }
  }

  openEditBackgroundPhotoDialog(open_event) {
    if (open_event == true) {
      this.dialog_state_edit_background_photo = true;
    }
  }

  editPhotoEvent(event, is_profile_photo) {
    if (event.confirmed === true) {
      this.uploadPhoto(event.url, is_profile_photo)
        .toPromise()
        .then((data) => {
          this.getUser(this.user_id);
        })
        .catch((error) => {
          console.log('error on upload photo: ', error);
        });
    }
    // cancel button
    else if (event.confirmed === false) {
      this.dialog_state_edit_profile_photo = false;
      this.dialog_state_edit_background_photo = false;
    } else {
      // unknown event
    }
  }

  //-------------------------API FUNCTIONS------------------------
  getUser(user_id) {
    this.pageSpinnerService.start();

    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        this.hidePage();
        if (data) {
          this.user = data[0];
          this.pageSpinnerService.stop();
          this.editPhotoSpinnerService.stop();
          this.dialog_state_edit_profile_photo = false;
          this.dialog_state_edit_background_photo = false;
          this.showPage(this.user);
        }
      })
      .catch((error) => {
        this.pageSpinnerService.reset();
      });
  }

  getConnections(user_id) {
    this.apiService
      .getConnections(user_id)
      .toPromise()
      .then((data) => {
        if (data) {
          this.connections = data;
        }
      });
  }

  uploadPhoto(url, is_profile_photo) {
    return this.apiService.uploadPhoto(url, is_profile_photo);
  }

  //-------------------------HELPER FUNCTIONS------------------------
  showPage(user) {
    if (user.username) {
      this.isNewUser(false);
      this.getConnections(user._id);
    } else {
      this.isNewUser(true);
    }
  }

  hidePage() {
    this.new_user = undefined;
  }

  getConnectionFromId(editin_connection_id) {
    for (let connection of this.connections) {
      if (connection._id == editin_connection_id) {
        return connection;
      }
    }
  }

  isNewUser(is_new_user) {
    this.new_user = is_new_user;
  }

  copyMessage() {
    this.microService.copyMessage(environment.host_url + this.user.username);
  }

  startProfilePhotoLoading() {
    this.profile_photo_loading = true;
  }

  stopProfilePhotoLoading() {
    this.profile_photo_loading = false;
  }

  startPhotoLoading(is_profile_photo) {
    is_profile_photo == true
      ? (this.profile_photo_loading = true)
      : (this.background_photo_loading = true);
  }

  stopPhotoLoading(is_profile_photo) {
    is_profile_photo == true
      ? (this.profile_photo_loading = false)
      : (this.background_photo_loading = false);
  }

  showPhotoError(error_message, is_profile_photo) {
    is_profile_photo == true
      ? (this.profile_photo_error = error_message)
      : (this.background_photo_error = error_message);

    setTimeout(() => {
      this.profile_photo_error = '';
      this.background_photo_error = '';
    }, 3000);
  }

  cleanProfilePhotoError() {
    this.profile_photo_error = '';
  }
}
