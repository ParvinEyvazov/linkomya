import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/data';
import { ApiService } from 'src/app/services/api-services/api.service';
import { PageSpinnerService } from 'src/app/services/spinner-services/page-spinner/page-spinner.service';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User;
  loading: boolean = false;
  error: string;

  dialog_state_delele_account: boolean = false;

  show_selection_menu: boolean = true;
  show_general_setting: boolean = false;
  show_change_username: boolean = false;
  show_update_password: boolean = false;

  page_name: string;
  page_names = {
    general: 'General settings',
    username: 'Change username',
    password: 'Update password',
  };

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private pageSpinnerService: PageSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser(this.userService.getUserId());

    this.route.params.subscribe((data) => {
      this.changeView(data.type);
    });
  }

  changeView(view) {
    // view -> selection_menu & general & username & password
    this.hideAllView();
    switch (view) {
      case 'selection_menu':
        this.show_selection_menu = true;
        break;
      case 'general':
        this.changePageName(this.page_names.general);
        this.show_general_setting = true;
        break;
      case 'username':
        this.changePageName(this.page_names.username);
        this.show_change_username = true;
        break;
      case 'password':
        this.changePageName(this.page_names.password);
        this.show_update_password = true;
        break;
      default:
        this.show_selection_menu = true;
        break;
    }
  }

  saveGeneralSettings(event) {
    this.apiService
      .updateUser(event.user)
      .toPromise()
      .then((data) => {
        this.navigateSettings();
      })
      .catch((error) => {});
  }

  saveUsername(event) {
    if (event === true) {
      this.navigateSettings();
    }
  }

  getUser(user_id) {
    this.pageSpinnerService.start();
    this.apiService
      .getUser(user_id)
      .toPromise()
      .then((data) => {
        if (data) {
          this.user = data[0];
          this.pageSpinnerService.stop();
        }
      })
      .catch((error) => {
        this.pageSpinnerService.reset();
      });
  }

  // HELPER FUNCTIONS
  navigateSettings() {
    this.router.navigate(['/settings']);
  }

  hideAllView() {
    this.show_selection_menu = false;
    this.show_general_setting = false;
    this.show_change_username = false;
    this.show_update_password = false;
  }

  changePageName(page_name) {
    this.page_name = page_name;
  }

  closeDeleteDialog(event) {
    if (event == false) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialog_state_delele_account = false;
  }
}
