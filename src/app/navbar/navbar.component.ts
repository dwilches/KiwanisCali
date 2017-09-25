import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.nav a').on('click', function(){
          $('.navbar-toggle').click();
      });
  }

}
