import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  array:number[];
  edit_open:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.array =  [1,2,3,4,5,6];
  }

  changeEditState(){
    this.edit_open = !this.edit_open;
  }

}
