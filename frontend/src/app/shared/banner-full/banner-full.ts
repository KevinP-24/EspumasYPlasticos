import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-full',
  imports: [CommonModule],
  templateUrl: './banner-full.html',
  styleUrl: './banner-full.css'
})
export class BannerFull {
  @Input() titleBlack: string = '';
  @Input() titleCyan: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() imagePosition: 'left' | 'right' = 'right';
}
