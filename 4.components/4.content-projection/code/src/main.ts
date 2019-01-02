import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component, NgModule, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
  selector: 'joke-form',
  templateUrl: 'joke-form-component.html',
  styleUrls: [
    'joke-form-component.css'
  ],
  encapsulation: ViewEncapsulation.Emulated
  // encapsulation: ViewEncapsulation.Native
  // encapsulation: ViewEncapsulation.None
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();

  createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}

@Component({
  selector: 'joke',
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
  @Input('joke') data: Joke;
}

@Component({
  selector: 'joke-list',
  template: `
<joke-form (jokeCreated)="addJoke($event)"></joke-form>
<joke *ngFor="let j of jokes" [joke]="j">
  <span class="setup">{{ j.setup }}?</span>
  <h1 class="punchline">{{ j.punchline }}</h1>
</joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror", "Hello-me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
    ];
  }

  addJoke(joke) {
    this.jokes.unshift(joke);
  }
}


@Component({
  selector: 'app',
  template: `
<joke-list></joke-list>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);