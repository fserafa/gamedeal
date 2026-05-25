import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DealData {
  id: string;
  title: string;
  selftext: string;
  url: string;
  permalink: string;
  created: number;
  store?: string;
}

export interface Deal {
  kind: string;
  data: DealData;
}

export interface RedditResponse {
  kind: string;
  data: {
    children: Deal[];
  };
}

export interface ProcessedDeals {
  allDeals: Deal[];
  freeGames: Deal[];
}

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.reddit.com/r/gamedeals/new.json?limit=50';

  getDeals(): Observable<ProcessedDeals> {
    return this.http.get<RedditResponse>(this.apiUrl).pipe(
      map(response => {
        const children = response.data?.children || [];
        
        // Process stores
        const processedChildren = children.map(deal => {
          const title = deal.data.title || '';
          const matches = title.match(/\[(.*?)\]/);
          if (matches && matches[1]) {
            deal.data.store = matches[1];
          } else {
            deal.data.store = 'Deal';
          }
          return deal;
        });

        // Filter free games
        const pattern = /free/gi;
        const freeGames = processedChildren.filter(deal => {
          return pattern.test(deal.data.title || '');
        });

        return {
          allDeals: processedChildren,
          freeGames: freeGames
        };
      })
    );
  }
}
