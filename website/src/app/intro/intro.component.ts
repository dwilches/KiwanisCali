import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    public newsList = [{
        imagePath: "/assets/one-time/valla-publicitaria.jpg",
        shortTitle: "Nueva valla publicitaria",
        fullTitle: "Nuestra Valla Kiwanis Sultana del Valle Invita a apoyar el proyecto de la Sirena:<br/>Jardin Infantil Kiwanis en Cali",
    }];

    public selectedNews;

    constructor() { }

    ngOnInit() {
    }

    setSelectedPhoto(photoIndex) {
      this.selectedNews = this.newsList[photoIndex];
    }
}
