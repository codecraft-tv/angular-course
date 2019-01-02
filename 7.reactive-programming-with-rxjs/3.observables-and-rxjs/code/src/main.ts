import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { map, filter, take } from "rxjs/operators";
import { interval, pipe } from "rxjs";

@Component({
  selector: "app",
  template: `
    <div>
      <p>Observables & RxJS Example</p>
      <p>(Please check the console)</p>
    </div>
  `
})
class AppComponent {
  constructor() {}

  ngOnInit() {
    interval(1000)
      .pipe(
        take(3),
        map(v => Date.now())
      )
      .subscribe(value => console.log("Subscriber: " + value));

    /*
  const middleware = pipe(
    take(3),
    map(v => Date.now())
  );

  interval(1000)
    .pipe(middleware)
    .subscribe(value => console.log("Subscriber: " + value));
    */
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
