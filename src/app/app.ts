import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { DealsService, Deal, ProcessedDeals } from './services/deals.service';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomCarouselComponent } from './components/custom-carousel/custom-carousel.component';
import { DealsComponent } from './components/deals/deals.component';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    CustomCarouselComponent,
    DealsComponent,
    AboutComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private dealsService = inject(DealsService);

  loading = signal<boolean>(true);
  deals = signal<Deal[]>([]);
  freeGames = signal<Deal[]>([]);
  
  paginatedDeals = signal<Deal[][]>([]);
  paginatedFreeGames = signal<Deal[][]>([]);
  
  dealsActiveIndex = signal<number>(0);

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    this.dealsService.getDeals().subscribe({
      next: (data: ProcessedDeals) => {
        this.deals.set(data.allDeals);
        this.freeGames.set(data.freeGames);
        
        this.paginatedDeals.set(this.paginate(data.allDeals, 10));
        this.paginatedFreeGames.set(this.paginate(data.freeGames, 3));
        
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching deals:', err);
        this.loading.set(false);
      }
    });
  }

  paginate(array: Deal[], pageSize: number): Deal[][] {
    const paginatedArray: Deal[][] = [];
    const pages = Math.ceil(array.length / pageSize);

    for (let i = 1; i <= pages; i++) {
      paginatedArray.push(array.slice((i - 1) * pageSize, i * pageSize));
    }

    return paginatedArray;
  }

  setPage(key: 'next' | 'prev' | 'index', index?: number) {
    const currentIndex = this.dealsActiveIndex();
    const totalPages = this.paginatedDeals().length;

    let targetIndex = currentIndex;

    if (key === 'next') {
      if (currentIndex < totalPages - 1) {
        targetIndex = currentIndex + 1;
      }
    } else if (key === 'prev') {
      if (currentIndex > 0) {
        targetIndex = currentIndex - 1;
      }
    } else if (key === 'index' && typeof index === 'number') {
      targetIndex = index;
    }

    this.dealsActiveIndex.set(targetIndex);

    // Smooth scroll into deals section
    const dealsEl = document.getElementById('deals');
    if (dealsEl) {
      dealsEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
