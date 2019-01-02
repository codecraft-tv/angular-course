import { NgModule, Component, OnDestroy } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { interval } from "rxjs";
import { take, map } from "rxjs/operators";
import {Observable} from 'rxjs';

@Component({
  selector: "async-pipe",
  template: `
 <div class="card card-block">
  <h4 class="card-title">AsyncPipe</h4>

  <p class="card-text" ngNonBindable>{{ promise | async }}  </p>
  <p class="card-text">{{ promise | async }}  </p>


  <p class="card-text" ngNonBindable>{{ observable$ | async }}  </p>
  <p class="card-text">{{ observable$ | async }}</p>


  <p class="card-text" ngNonBindable>{{ observableData }}  </p>
  <p class="card-text">{{ observableData }}</p>
 </div>
  `
})
class AsyncPipeComponent implements OnDestroy {
  promise: Promise<{}>;
  observable$: Observable<number>;
  subscription: Object = null;
  observableData: number;

  constructor() {
    this.promise = this.getPromise();
    this.observable$ = this.getObservable();
    this.subscribeObservable();
  }

  getObservable() {
    return interval(1000).pipe(
      take(10),
      map(v => v * v)
    );
  }

  // AsyncPipe subscribes to the observable automatically
  subscribeObservable() {
    this.subscription = this.getObservable().subscribe(
      v => (this.observableData = v)
    );
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("Promise complete!"), 3000);
    });
  }

  // AsyncPipe unsubscribes from the observable automatically
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

@Component({
  selector: "app",
  template: `
  <async-pipe></async-pipe>
 `
})
class AppComponent {
  imageUrl: string = "";
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, AsyncPipeComponent],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);