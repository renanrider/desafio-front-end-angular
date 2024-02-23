import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  enableBackButtom = true;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.enableBackButtom$.subscribe((enableBackButtom) => {
      this.enableBackButtom = enableBackButtom;
    });
  }

  back() {
    this.navigationService.back();
  }
}
