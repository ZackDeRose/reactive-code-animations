import {
  AfterViewInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';

let _id = 0;
@Component({
  selector: 'rca-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemComponent)
  items!: QueryList<CarouselItemComponent>;
  carouselId = `rca-carousel-${_id++}`;

  activeItem$ = new BehaviorSubject<number>(0);

  itemIndices = [0, 1, 2];
  itemCount = this.itemIndices.length;

  ngAfterViewInit() {
    this.showItem(0);
  }

  isActiveItem$(index: number) {
    return this.activeItem$.pipe(map((activeIndex) => activeIndex === index));
  }

  showItem(index: number): void {
    this.activeItem$.next(index);
    this.items.forEach((el, i) => {
      el.updateVisibility(i === index);
    });
  }
}
