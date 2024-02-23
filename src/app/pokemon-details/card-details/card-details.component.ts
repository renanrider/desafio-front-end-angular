import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
})
export class CardDetailsComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() thumbnail?: string;
  @Input() backgroundColor?: string;
  @Input() link?: string[];

  constructor() {}
}
