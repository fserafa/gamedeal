import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { Deal } from '../../services/deals.service';

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.css',
  imports: [DatePipe]
})
export class CustomCarouselComponent {
  data = input<Deal[][]>([]);
  activeIndex = signal<number>(0);

  prev() {
    const currentData = this.data();
    const index = this.activeIndex();
    if (currentData && currentData.length > 0) {
      this.activeIndex.set(index === 0 ? currentData.length - 1 : index - 1);
    }
  }

  next() {
    const currentData = this.data();
    const index = this.activeIndex();
    if (currentData && currentData.length > 0) {
      this.activeIndex.set(index === currentData.length - 1 ? 0 : index + 1);
    }
  }

  openUrl(url: string) {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
