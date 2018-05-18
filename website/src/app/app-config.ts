import * as _ from "lodash";
import {InjectionToken} from "@angular/core";

export const APP_CONFIG = new InjectionToken("app.config");

export interface Gallery {
    id: number;
    numPhotos: number;
    name: string;
}

export class AppConfig {
    private galleries: Gallery[] = [
        {id: 1, numPhotos: 66, name: "Día de los niños"},
        {id: 2, numPhotos: 12, name: "Día de las madres"}
    ];

    public getNumPhotosPerPage(): number {
        return 9;
    }

    public getGalleries(): Gallery[] {
        return this.galleries;
    }

    public getGallery(id): Gallery {
        return _.find(this.galleries, {id: parseInt(id, 10)});
    }
}

export function appConfigFactory() {
    return new AppConfig();
}
