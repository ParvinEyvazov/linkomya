import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/interfaces/data';

@Component({
  selector: 'app-link-box',
  templateUrl: './link-box.component.html',
  styleUrls: ['./link-box.component.scss'],
})
export class LinkBoxComponent implements OnInit {
  @Input() connection: Connection;

  constructor() {}

  ngOnInit(): void {}
}
