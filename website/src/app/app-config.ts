import {InjectionToken} from "@angular/core";

export const APP_CONFIG = new InjectionToken("app.config");

export class AppConfig {

    public getNumPhotosPerPage() {
        return 9;
    }

    public getGalleries() {
        return {
            1: {id: 1, numPhotos: 66, name: "Día de los niños"},
            2: {id: 2, numPhotos: 20, name: "Día de las madres"}
        };
    }
}
