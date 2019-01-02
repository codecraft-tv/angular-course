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
  OnDestroy,
  ViewChild,
  ViewChildren,
  ContentChild,
  ContentChildren,
  ElementRef,
  QueryList
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
class JokeComponent {
  @Input("joke") data: Joke;
}

@Component({
  selector: "joke-list",
  template: `
<h4 #header>View Jokes</h4>
<joke *ngFor="let j of jokes" [joke]="j">
  <span class="setup">{{ j.setup }}?</span>
  <h1 class="punchline">{{ j.punchline }}</h1>
</joke>
<h4>Content Jokes</h4>
<ng-content></ng-content>
`
})
class JokeListComponent implements OnInit, AfterContentInit, AfterViewInit {
  jokes: Joke[] = [
    new Joke(
      "What did the cheese say when it looked in the mirror",
      "Hello-me (Halloumi)"
    ),
    new Joke(
      "What kind of cheese do you use to disguise a small horse",
      "Mask-a-pony (Mascarpone)"
    )
  ];

  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeViewChildren: QueryList<JokeComponent>;
  @ViewChild("header") headerEl: ElementRef;
  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;

  constructor() {
    console.log(`new - jokeViewChild is ${this.jokeViewChild}`);
    console.log(`new - jokeContentChild is ${this.jokeContentChild}`);
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(
      `ngAfterContentInit - jokeContentChild is ${this.jokeContentChild}`
    );
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit - jokeViewChild is ${this.jokeViewChild}`);

    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    console.log(jokes);

    console.log(`ngAfterViewInit - headerEl is ${this.headerEl}`);
    this.headerEl.nativeElement.textContent = "Best Joke Machine";
  }
}

@Component({
  selector: "app",
  template: `
<joke-list>
  <joke [joke]="joke">
    <span class="setup">{{ joke.setup }}?</span>
    <h1 class="punchline">{{ joke.punchline }}</h1>  
  </joke>
</joke-list>
`
})
class AppComponent {
  joke: Joke = new Joke(
    "A kid threw a lump of cheddar at me",
    "I thought ‘That’s not very mature’"
  );
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, JokeComponent, JokeListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);