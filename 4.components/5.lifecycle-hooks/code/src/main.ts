import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: "joke",
  template: `
<div class="card card-block">
  <h4 class="card-title">
    <ng-content select=".setup"></ng-content>
  </h4>
  <p class="card-text"
     [hidden]="data.hide">
    <ng-content select=".punchline"></ng-content>
  </p>
  <a class="btn btn-primary"
     (click)="data.toggle()">Tell Me
  </a>
</div>
`
})
class JokeComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy {
  @Input("joke") data: Joke;

  constructor() {
    console.log(`new - data is ${this.data}`);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`ngOnChanges - data is ${this.data}`);

    for (let key in changes) {
      console.log(`${key} changed. 
Current: ${changes[key].currentValue}. 
Previous: ${changes[key].previousValue}`);
    }
  }

  ngOnInit() {
    console.log(`ngOnInit  - data is ${this.data}`);
  }

  ngDoCheck() {
    console.log("ngDoCheck");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }
}

@Component({
  selector: "joke-list",
  template: `
<joke *ngFor="let j of jokes" [joke]="j">
  <span class="setup">{{ j.setup }}?</span>
  <h1 class="punchline">{{ j.punchline }}</h1>
</joke>

<button type="button"
        class="btn btn-success"
        (click)="addJoke()">Add Joke
</button>
  <button type="button"
        class="btn btn-danger"
        (click)="deleteJoke()">Clear Jokes
</button>
`
})
class JokeListComponent {
  jokes: Joke[] = [];

  addJoke() {
    this.jokes.unshift(
      new Joke(
        "What did the cheese say when it looked in the mirror",
        "Hello-me (Halloumi)"
      )
    );
  }

  deleteJoke() {
    this.jokes = [];
  }
}

@Component({
  selector: "app",
  template: `
<joke-list></joke-list>
`
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);