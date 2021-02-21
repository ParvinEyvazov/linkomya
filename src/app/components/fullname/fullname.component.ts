import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fullname',
  templateUrl: './fullname.component.html',
  styleUrls: ['./fullname.component.scss'],
})
export class FullnameComponent implements OnInit {
  @Input() fullname: string;
  @Input() verified: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
