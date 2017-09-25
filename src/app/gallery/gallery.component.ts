import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

declare let $;

const NUM_PHOTOS_PER_PAGE = 6;

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    public photos = [];

    // Calculated values
    public fromPhoto = 0;
    public toPhoto = NUM_PHOTOS_PER_PAGE;
    public pages = [];
    public currentPage = 1;

    constructor() {
        for (let i = 1; i <= 10; i++) {
            this.photos.push(`/assets/gallery/image (${i})`);
        }
        const numPages = Math.ceil(this.photos.length / NUM_PHOTOS_PER_PAGE);
        this.pages = _.range(1, numPages + 1);
    }

    ngOnInit() {
    }

    public gotoPage(page)
    {
        if (page === 'previous') {
            if (this.currentPage === 1) {
                return;
            }
            page = this.currentPage - 1;
        }
        else if (page === 'next') {
            if (this.currentPage === this.pages.length) {
                return;
            }
            page = this.currentPage + 1;
        }

        this.currentPage = page;

            this.fromPhoto = (this.currentPage - 1) * NUM_PHOTOS_PER_PAGE;
        this.toPhoto = this.fromPhoto + NUM_PHOTOS_PER_PAGE;
    }

}


$(document).ready(function(){

    loadGallery(true, 'a.thumbnail');

    // This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
        $('#show-previous-image, #show-next-image').show();
        if (counter_max === counter_current) {
            $('#show-next-image').hide();
        } else if (counter_current === 1) {
            $('#show-previous-image').hide();
        }
    }


    function loadGallery(setIDs, setClickAttr) {
        let current_image,
            selector,
            counter = 0;

        $('#show-next-image, #show-previous-image').click(function(){
            if ($(this).attr('id') === 'show-previous-image') {
                current_image--;
            } else {
                current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
        });

        function updateGallery(selectorTmp) {
            const $sel = selectorTmp;
            current_image = $sel.data('image-id');
            $('#image-gallery-caption').text($sel.data('caption'));
            $('#image-gallery-title').text($sel.data('title'));
            $('#image-gallery-image').attr('src', $sel.data('image'));
            disableButtons(counter, $sel.data('image-id'));
        }

        if (setIDs === true) {
            $('[data-image-id]').each(function(){
                counter++;
                $(this).attr('data-image-id', counter);
            });
        }
        $(setClickAttr).on('click', function(){
            updateGallery($(this));
        });
    }
});

