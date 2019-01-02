import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    NgModule,
    Input,
    AfterContentInit,
    ContentChildren,
    QueryList
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'carousel-item',
  template: `
<div class="carousel-item text-center" [hidden]="!isActive">
   <ng-content></ng-content>
</div>
`
})
class CarouselItemComponent {
  isActive: boolean = false;
}

@Component({
  selector: 'carousel',
  template: `<div class="carousel slide">
  <div class="carousel-inner" role="listbox">
    <ng-content></ng-content>
  </div>
</div>  
`
})
class CarouselComponent implements AfterContentInit {
  @ContentChildren(CarouselItemComponent) carouselItemsList: QueryList<CarouselItemComponent>;

  @Input() delay: number = 500;

  ngAfterContentInit() {
    let carouselItems = this.carouselItemsList.toArray();
    let count: number = 0;
    let max = carouselItems.length;
    setInterval(() => {
      let i = count % max;
      carouselItems.forEach((item) => item.isActive = false);
      carouselItems[i].isActive = true;
      count += 1;
    }, this.delay)
  }
}


@Component({
  selector: 'app',
  template: `
<carousel [delay]="2000">
  <carousel-item>
    <img src="https://unsplash.it/200?image=0" alt="">
  </carousel-item>
  <carousel-item>
    <img src="https://unsplash.it/200?image=100" alt="">
  </carousel-item>
  <carousel-item>
    <img src="https://unsplash.it/200?image=200" alt="">
  </carousel-item>
</carousel>
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    CarouselItemComponent,
    CarouselComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);