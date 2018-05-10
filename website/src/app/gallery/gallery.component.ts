import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
declare var $: any;

const NUM_PHOTOS_PER_PAGE = 9;
const TOTAL_NUM_PHOTOS = 66;

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
        this.photos = _.range(1, TOTAL_NUM_PHOTOS + 1);
        const numPages = Math.ceil(this.photos.length / NUM_PHOTOS_PER_PAGE);
        this.pages = _.range(1, numPages + 1);
    }

    public getThumbUrl(numPhoto) {
        return `/assets/gallery/image (${numPhoto})_thumb.jpg`;
    }

    public setSelectedPhoto(numPhoto) {
        this.selectedImage = `/assets/gallery/image (${numPhoto}).jpg`;
    }

    public gotoPage(page) {
        this.currentPage = page;
        this.fromPhoto = (this.currentPage - 1) * NUM_PHOTOS_PER_PAGE;
        this.toPhoto = this.fromPhoto + NUM_PHOTOS_PER_PAGE;
    }

    public closeModal() {
        $('#image-gallery').modal('toggle');
    }
}

