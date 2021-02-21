import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'design-circle',
  templateUrl: './design-circle.component.html',
  styleUrls: ['./design-circle.component.scss'],
})
export class DesignCircleComponent implements OnInit {
  constructor() {}

  @Input() hide_in_small_screen: boolean = false;
  @Input() size: string = 'normal'; // normal || large

  ngOnInit(): void {}
}
