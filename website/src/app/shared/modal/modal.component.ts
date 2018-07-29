import { Component, OnInit, Input } from '@angular/core';

declare var $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() image;

    constructor() { }

    ngOnInit() {
    }

    closeModal() {
        $('#image-modal').modal('toggle');
    }
}
