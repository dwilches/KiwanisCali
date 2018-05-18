import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG, AppConfig} from "../app-config";

@Component({
    selector: 'app-gallery-list',
    templateUrl: './gallery-list.component.html',
    styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {

    public galleries: Array<any>;

    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
    }

    ngOnInit() {
        this.galleries = this.appConfig.getGalleries();
    }

}
