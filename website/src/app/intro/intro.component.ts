import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    public newsList = [{
        imagePath: "/assets/one-time/bingo-bailable.jpg",
        shortTitle: "Bingo bailable en la Tienda de Pedro",
        fullTitle: "Adquiere tu Bono para nuestro Gran Bingo en la Tienda de Pedro el 4 de agosto de 2018.<br/>Contacto: 3162928090 / 3155792021",
    },{
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

    closeModal() {
        $('#image-modal').modal('toggle');
    }
}
