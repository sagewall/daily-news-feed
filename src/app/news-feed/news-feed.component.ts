import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Article, ArticleResponse } from '../article';
import { NewsService } from '../news.service';
import { Source, SourceResponse } from '../source';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
  activeSource: Source;
  articles: Article[];
  sources: Source[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService
      .getSources()
      .subscribe((data: SourceResponse) => (this.sources = data.sources));
    this.searchTopHeadlines();
  }

  searchArticlesBySource(source: Source) {
    this.activeSource = source;
    this.newsService
      .getTopHeadlinesBySource(source.id)
      .subscribe((data: ArticleResponse) => (this.articles = data.articles));
  }

  searchTopHeadlines() {
    this.newsService
      .getTopHeadlines()
      .subscribe((data: ArticleResponse) => (this.articles = data.articles));
    this.activeSource = null;
  }
}
