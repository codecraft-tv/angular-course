import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    NgModule
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


@Directive({
  selector: "img[ccRollover]"
})
class RolloverImageDirective {
  //TODO: Flesh out this directive
  //TODO: HINT - Use ngOnChanges()
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