import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    Directive,
    NgModule,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

//
// Domain Model
//
class Joke {
  public hide: boolean;

  constructor(public setup: string, public punchline: string) {
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

//
// Structural Directives
//
@Directive({
  selector: '[ccIf]'
})
export class CodeCraftIfDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ccIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}


@Directive({
  selector: '[ccFor]'
})
export class CodeCraftForOfDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ccForOf(collection: any) {
    if (collection) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}


//
// Components
//
//
@Component({
  selector: 'joke',
  template: `
<div class="card card-block">
  <h4 class="card-title">
    {{ data.setup }}
  </h4>
  <ng-template [ngIf]="!data.hide">
    <p class="card-text">
    {{ data.punchline }}
  </p>  
  </ng-template>
  <button class="btn btn-primary"
          (click)="data.toggle()">Tell Me
  </button>
</div>
`
})
class JokeComponent {
  @Input('joke') data: Joke;
}

@Component({
  selector: 'joke-list',
  template: `
<ng-template ngFor
          let-j
          [ngForOf]="jokes">
  <joke [joke]="j"></joke>
</ng-template>
`
})
class JokeListComponent {
  jokes: Joke[] = [];

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

//
// Bootstrap
//
@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    CodeCraftIfDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);