import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    Renderer,
    HostListener,
    HostBinding,
    ElementRef,
    NgModule,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
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


@Directive({
  selector: "[ccCardHover]"
})
class CardHoverDirective {
  @HostBinding('class.card-outline-primary')private ishovering: boolean;

  constructor(private el: ElementRef,
              private renderer: Renderer) {
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  @HostListener('mouseover') onMouseOver() {
    let part = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setElementStyle(part, 'display', 'block');
    this.ishovering = true;
  }

  @HostListener('mouseout') onMouseOut() {
    let part = this.el.nativeElement.querySelector('.card-text');
    this.renderer.setElementStyle(part, 'display', 'none');
    this.ishovering = false;
  }
}

@Component({
  selector: 'joke',
  template: `
<div class="card card-block" ccCardHover>
  <h4 class="card-title">{{data.setup}}</h4>
  <p class="card-text"
     [style.display]="'none'">{{data.punchline}}</p>
</div>
  `
})
class JokeComponent {
  @Input('joke') data: Joke;
}

@Component({
  selector: 'joke-list',
  template: `
<joke *ngFor="let j of jokes" [joke]="j"></joke>
  `
})
class JokeListComponent {
  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Hello-me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
    ];
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
    CardHoverDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);