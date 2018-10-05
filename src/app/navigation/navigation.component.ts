import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../article';
import { NewsService } from '../news.service';
import { Source } from '../source';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  activeSource: Source;
  articles: Article[];
  sources: Source[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.getSources().subscribe(data => this.sources = data['sources']);
    this.searchTopHeadlines();
  }

  searchArticlesBySource(source: Source) {
    this.activeSource = source;
    this.newsService.getTopHeadlinesBySource(source.id).subscribe(data => this.articles = data['articles']);
  }

  searchTopHeadlines() {
    this.newsService.getTopHeadlines().subscribe(data => this.articles = data['articles']);
    this.activeSource = null;
  }

}
