import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    HostListener,
    HostBinding,
    NgModule,
    Input
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';



@Directive({
  selector: "img[ccRollover]"
})
class RolloverImageDirective {
  @Input('ccRollover') config = {
    'initial': 'https://unsplash.it/200/300?image=201',
    'over': ''
  };

  @HostBinding('src') private imagePath: string;

  ngOnChanges() {
    if (this.config.initial) {
      this.imagePath = this.config.initial;
    }
  }

  @HostListener('mouseover') onMouseOver() {
    this.imagePath = this.config.over;
  }

  @HostListener('mouseout') onMouseOut() {
    this.imagePath = this.config.initial;
  }
}

@Component({
  selector: 'app',
  template: `
<img [ccRollover]="{
  'initial':'https://unsplash.it/200/300?image=201',
  'over':'https://unsplash.it/200/300?image=202'
}"/> 
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    RolloverImageDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);