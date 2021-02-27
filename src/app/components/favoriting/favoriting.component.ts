import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FavoritingSpinnerService } from '../../services/spinner-services/favoriting-spinner/favoriting-spinner.service';

@Component({
  selector: 'app-favoriting',
  templateUrl: './favoriting.component.html',
  styleUrls: ['./favoriting.component.scss'],
})
export class FavoritingComponent implements OnInit {
  @Input() is_favorite: boolean = false;
  @Output() event = new EventEmitter<boolean>();
  loading: boolean = false;

  constructor(
    private favoritingSpinnerService: FavoritingSpinnerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.favoritingSpinnerService.getSpinner().subscribe((state) => {
      this.loading = state;
      this.cdRef.detectChanges();
    });
  }

  changeFavoriteRelation() {
    this.event.emit(this.is_favorite);
  }
}
