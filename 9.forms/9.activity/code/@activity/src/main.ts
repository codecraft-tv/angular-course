import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    NgModule,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

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
  template: `<div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <form>
    <div class="form-group">
      <input type="text"
             class="form-control"
             placeholder="Enter the setup"
             #setup>
    </div>
    <div class="form-group">
      <input type="text"
             class="form-control"
             placeholder="Enter the punchline"
             #punchline>
    </div>
    <button type="button"
            class="btn btn-primary"
            (click)="createJoke(setup.value, punchline.value)">Create
    </button>
  </form>
</div>

  `
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();
  form: FormGroup;
  punchline: FormControl;
  setup: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    //TODO
  }

  createForm() {
    //TODO
  }

  createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}


@Component({
  selector: 'joke',
  template: `
<div class="card card-block">
  <h4 class="card-title">
  	{{data.setup}}
  </h4>
  <p class="card-text"
     [hidden]="data.hide">{{data.punchline}}</p>
  <a (click)="data.toggle()"
     class="btn btn-warning">Tell Me
  </a>
  <a (click)="deleteItem()"
     class="btn btn-danger">Delete
  </a>  
</div>
  `
})
class JokeComponent {
  @Input('joke') data: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();

  deleteItem() {
    this.jokeDeleted.emit(this.data);
  }
}

@Component({
  selector: 'joke-list',
  template: `
<joke-form (jokeCreated)="addJoke($event)"></joke-form>
<joke *ngFor="let j of jokes" [joke]="j" (jokeDeleted)="deleteJoke($event)"></joke>
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

  addJoke(joke) {
    this.jokes.unshift(joke);
  }

  deleteJoke(joke) {
    debugger;
    let indexToDelete = this.jokes.indexOf(joke);
    if (indexToDelete !== -1) {
      this.jokes.splice(indexToDelete, 1);
    }
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
  imports: [
    BrowserModule,
    //TODO - make sure to import and add the required modules!
  ],
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