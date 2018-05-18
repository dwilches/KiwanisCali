import * as _ from "lodash";

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
declare var $: any;

const NUM_PHOTOS_PER_PAGE = 9;

const galleries = {
    1: {galleryId: 1, numPhotos: 66},
    2: {galleryId: 2, numPhotos: 20}
};

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

    public currentGallery;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
          this.route.paramMap.subscribe(
            (params: ParamMap) => {
                this.currentGallery = galleries[params.get('galleryId')];
                console.log(this.currentGallery, params.get('galleryId'));

                this.photos = _.range(1, this.currentGallery.numPhotos + 1);
                const numPages = Math.ceil(this.photos.length / NUM_PHOTOS_PER_PAGE);
                this.pages = _.range(1, numPages + 1);
            });
    }

    public getThumbUrl(numPhoto) {
        return `/assets/gallery-${this.currentGallery.galleryId}/image (${numPhoto})_thumb.jpg`;
    }

    public setSelectedPhoto(numPhoto) {
        this.selectedImage = `/assets/gallery-${this.currentGallery.galleryId}/image (${numPhoto}).jpg`;
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
