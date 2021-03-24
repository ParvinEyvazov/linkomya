import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'background-photo',
  templateUrl: './background-photo.component.html',
  styleUrls: ['./background-photo.component.scss'],
})
export class BackgroundPhotoComponent implements OnInit {
  default_photo =
    '../../../assets/background_photo/default_background_photo.jpeg';

  @Input() can_edit: boolean = false;
  @Input() url: string;

  @Output() event = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.url == undefined ? (this.url = this.default_photo) : undefined;
  }

  openEditPhotoDialog() {
    this.event.emit(true);
  }
}
