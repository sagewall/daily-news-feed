import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ArticleResponse, Article } from './article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getSources() {
    return this.http.get(
      'https://newsapi.org/v2/sources?language=en&apiKey=' +
        environment.newsAPIKey
    );
  }

  getTopHeadlines() {
    return this.http.get(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=' +
        environment.newsAPIKey
    );
  }

  getTopHeadlinesBySource(source: string) {
    return this.http.get(
      'https://newsapi.org/v2/top-headlines?sources=' +
        source +
        '&apiKey=' +
        environment.newsAPIKey
    );
  }

  searchTopHeadlines(q: string): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(
      'https://newsapi.org/v2/top-headlines?q=' +
        q +
        '&apiKey=' +
        environment.newsAPIKey
    );
  }
}
