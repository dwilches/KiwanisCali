import * as _ from "lodash";

import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {APP_CONFIG, AppConfig} from "../app-config";
declare var $: any;

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
    public toPhoto: number;
    public pages = [];
    public currentPage = 1;

    private currentGallery;

    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig,
                private route: ActivatedRoute) {
        this.toPhoto = appConfig.getNumPhotosPerPage();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(
            (params: ParamMap) => {
                this.currentGallery = this.appConfig.getGalleries()[params.get('galleryId')];
                console.log(this.currentGallery);

                this.photos = _.range(1, this.currentGallery.numPhotos + 1);
                const numPages = Math.ceil(this.photos.length / this.appConfig.getNumPhotosPerPage());
                this.pages = _.range(1, numPages + 1);
            });
    }

    public getThumbUrl(numPhoto) {
        return `/assets/gallery-${this.currentGallery.id}/image (${numPhoto})_thumb.jpg`;
    }

    public setSelectedPhoto(numPhoto) {
        this.selectedImage = `/assets/gallery-${this.currentGallery.id}/image (${numPhoto}).jpg`;
    }

    public gotoPage(page) {
        this.currentPage = page;
        this.fromPhoto = (this.currentPage - 1) * this.appConfig.getNumPhotosPerPage();
        this.toPhoto = this.fromPhoto + this.appConfig.getNumPhotosPerPage();
    }

    public closeModal() {
        $('#image-gallery').modal('toggle');
    }
}
