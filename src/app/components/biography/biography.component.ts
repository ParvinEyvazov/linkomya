import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
})
export class BiographyComponent implements OnInit {
  @Input() country: string;
  @Input() city: string;
  @Input() job: string;

  constructor() {}

  ngOnInit(): void {}
}
