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
  <form novalidate
        [formGroup]="form">
    <div class="form-group"
         [ngClass]="{
        'has-danger': setup.invalid && (setup.dirty || setup.touched),
        'has-success': setup.valid && (setup.dirty || setup.touched)
      }">
      <input type="text"
             class="form-control"
             placeholder="Enter the setup"
             formControlName="setup">
      <div class="form-control-feedback"
           *ngIf="setup.errors && (setup.dirty || setup.touched)">
        <p *ngIf="setup.errors.required">Setup is required</p>
      </div>
    </div>
    <div class="form-group"
         [ngClass]="{
        'has-danger': punchline.invalid && (punchline.dirty || punchline.touched),
        'has-success': punchline.valid && (punchline.dirty || punchline.touched)
      }">
      <input type="text"
             class="form-control"
             placeholder="Enter the punchline"
             formControlName="punchline">
      <div class="form-control-feedback"
           *ngIf="punchline.errors && (punchline.dirty || punchline.touched)">
        <p *ngIf="punchline.errors.required">Punchline is required</p>
      </div>
    </div>
    <button type="button"
            class="btn btn-primary"
            [disabled]="form.invalid"
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
    this.setup = new FormControl('', Validators.required);
    this.punchline = new FormControl('', Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      punchline: this.punchline,
      setup: this.setup
    });
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
    ReactiveFormsModule,
    FormsModule
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