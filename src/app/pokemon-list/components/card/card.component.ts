import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterContentInit {
  @Input() pokemonType?: string;
  @Input() url?: string;
  @Input() backgroundColor?: string;
  pokemonId?: number;

  ngAfterContentInit(): void {
    if (!this.url) return;
    const regex: RegExp = /\/(\d+)\/$/;

    const match: RegExpExecArray | null = regex.exec(this.url);

    if (match && match[1]) {
      const id: string = match[1];
      this.pokemonId = Number(id);
    } else {
      console.log('No match found.');
    }
  }
}
