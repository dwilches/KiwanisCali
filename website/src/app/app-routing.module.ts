import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from "./news/news.component";
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryListComponent } from "./gallery-list/gallery-list.component";

const routes: Routes = [
    {path: '', component: IntroComponent,},
    {path: 'quienes-somos', component: AboutComponent, },
    {path: 'galeria', component: GalleryListComponent, },
    {path: 'noticias', component: NewsComponent, },
    {path: 'galeria/:galleryId', component: GalleryComponent, },
    {path: 'contactenos', component: ContactComponent, },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
