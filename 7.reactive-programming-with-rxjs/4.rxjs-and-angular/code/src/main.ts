import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "form-app",
  template: `<form [formGroup]="form"
      (ngSubmit)="onSubmit()">
      
  <!-- Output comment -->
  <div class="card card-block">
    <pre class="card-text">{{ form.value.comment }}</pre>
  </div>
  <p class="small">{{ form.value.lastUpdateTS }}</p>
  <!-- Comment text area -->
  <div class="form-group">
    <label for="comment">Comment</label>
    <textarea class="form-control"
              formControlName="comment"
              rows="3"></textarea>
    <small class="form-text text-muted">
           <span>{{ 100 - form.value.comment.length }}</span> characters left
    </small>
  </div>
  <!-- Name input -->
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text"
           class="form-control"
           formControlName="name"
           placeholder="Enter name">
  </div>
  <!-- Email input -->
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email"
           class="form-control"
           formControlName="email"
           placeholder="Enter email">
    <small class="form-text text-muted">
           We'll never share your email with anyone else.
    </small>
  </div>
  <button type="submit"
          class="btn btn-primary"
          [disabled]="!form.valid">Submit
  </button>
</form>  
 `
})
class FormAppComponent {
  form: FormGroup;
  comment = new FormControl("", Validators.required);
  name = new FormControl("", Validators.required);
  email = new FormControl("", [
    Validators.required,
    Validators.pattern("[^ @]*@[^ @]*")
  ]);

  /* Observable Solution */
  // constructor(fb: FormBuilder) {
  //   this.form = fb.group({
  //     comment: this.comment,
  //     name: this.name,
  //     email: this.email
  //   });
  //   this.form.valueChanges
  //     .pipe(
  //       filter(data => this.form.valid),
  //       map(data => {
  //         data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, "");
  //         return data;
  //       }),
  //       map(data => {
  //         data.lastUpdateTS = new Date();
  //         return data;
  //       })
  //     )
  //     .subscribe(data => console.log(JSON.stringify(data)));
  // }
  /* None Observable Solution */
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      "comment": this.comment,
      "name": this.name,
      "email": this.email
    });
    this.form.valueChanges
        .subscribe( data => {
          if (this.form.valid) {
            data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
            data.lastUpdateTS = new Date();
            console.log(JSON.stringify(data))
          }
        });
  }

  onSubmit() {
    console.log("Form submitted!");
  }
}

@Component({
  selector: "app",
  template: `
<form-app></form-app>
  `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, FormAppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);