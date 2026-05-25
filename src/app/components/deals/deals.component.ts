import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Deal } from '../../services/deals.service';

@Component({
  selector: 'app-deals',
  standalone: true,
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css',
  imports: [DatePipe]
})
export class DealsComponent {
  deals = input<Deal[]>([]);

  getStoreGradient(store?: string): string {
    if (!store) return 'var(--accent-gradient)';

    const s = store.toLowerCase();
    if (s.includes('steam')) {
      return 'linear-gradient(135deg, #1b2838 0%, #101822 100%)';
    }
    if (s.includes('epic') || s.includes('egs')) {
      return 'linear-gradient(135deg, #2a2a2a 0%, #111111 100%)';
    }
    if (s.includes('gog')) {
      return 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)';
    }
    if (s.includes('humble')) {
      return 'linear-gradient(135deg, #e31837 0%, #900c1e 100%)';
    }
    if (s.includes('fanatical')) {
      return 'linear-gradient(135deg, #ff4c00 0%, #b33500 100%)';
    }
    if (s.includes('itch')) {
      return 'linear-gradient(135deg, #fa5c5c 0%, #c42b2b 100%)';
    }
    if (s.includes('gala')) {
      return 'linear-gradient(135deg, #e40046 0%, #a20031 100%)';
    }
    if (s.includes('nintendo')) {
      return 'linear-gradient(135deg, #e60012 0%, #a0000a 100%)';
    }
    if (s.includes('playstation') || s.includes('psn')) {
      return 'linear-gradient(135deg, #0037ae 0%, #00226e 100%)';
    }
    if (s.includes('xbox')) {
      return 'linear-gradient(135deg, #107c10 0%, #0a4e0a 100%)';
    }
    return 'var(--accent-gradient)';
  }
}
