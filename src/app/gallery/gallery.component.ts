import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

const NUM_PHOTOS_PER_PAGE = 6;

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    public photos = [];
    public selectedImage: string;

    // Calculated values
    public fromPhoto = 0;
    public toPhoto = NUM_PHOTOS_PER_PAGE;
    public pages = [];
    public currentPage = 1;

    constructor() {
    }

    ngOnInit() {
        for (let i = 1; i <= 50; i++) {
            this.photos.push(`/assets/gallery/image (${i})`);
        }
        const numPages = Math.ceil(this.photos.length / NUM_PHOTOS_PER_PAGE);
        this.pages = _.range(1, numPages + 1);
    }

    public gotoPage(page) {
        this.currentPage = page;

            this.fromPhoto = (this.currentPage - 1) * NUM_PHOTOS_PER_PAGE;
        this.toPhoto = this.fromPhoto + NUM_PHOTOS_PER_PAGE;
    }

    public setSelectedImage(photo) {
        this.selectedImage = photo;
    }
}

