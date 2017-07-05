import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'SF Muni App';

  constructor() { }

  ngOnInit() {
  }

}
