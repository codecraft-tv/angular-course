import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    NgModule,
    AfterContentInit,
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'carousel-item',
  template: `
<div class="carousel-item text-center">
   <ng-content></ng-content>
</div>
`
})
class CarouselItemComponent {
  //TODO: Show the content in this carousel
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

  ngAfterContentInit() {
    //TODO: maybe use the setInterval function to call a function every x milliseconds?
  }
}


//TODO: Take a look at the markup below to see how you might implement this?
@Component({
  selector: 'app',
  template: `
<carousel [delay]="2000">
  <carousel-item>
    <img src="https://unsplash.it/200" alt="">
  </carousel-item>
  <carousel-item>
    <img src="https://unsplash.it/200" alt="">
  </carousel-item>
  <carousel-item>
    <img src="https://unsplash.it/200" alt="">
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