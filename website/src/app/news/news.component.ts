import * as _ from "lodash";

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  imagesNews1: number[] = []
  imagesNews2: number[] = []

  constructor() { }

  ngOnInit() {
    this.imagesNews1 = _.range(1, 4)
    this.imagesNews2 = _.range(1, 17)
  }

  public getThumbUrl(newsId, numPhoto) {
    return `/assets/news-${newsId}/Image ${numPhoto}_thumb.jpg`
  }
}
