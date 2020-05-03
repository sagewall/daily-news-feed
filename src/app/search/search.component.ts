import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { Article, ArticleResponse } from '../article';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchFormControl = new FormControl('');
  articleResponse: Observable<ArticleResponse>;

  @Output() articleEmitter = new EventEmitter<Article[]>();

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.articleResponse = this.searchFormControl.valueChanges.pipe(
      filter((value) => value.length > 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => this.newsService.searchTopHeadlines(value))
    );

    this.articleResponse.subscribe((articleResponse) => {
      this.articleEmitter.emit(articleResponse.articles);
    });
  }
}
