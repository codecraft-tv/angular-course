import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


@Component({
  selector: 'model-form',
  template: `
  <div class="container">
  <form novalidate
      [formGroup]="myform"
      (ngSubmit)="onSubmit()">

  <fieldset formGroupName="name">
    <div class="form-group"
         [ngClass]="{
        'has-danger': firstName.invalid && (firstName.dirty || firstName.touched),
        'has-success': firstName.valid && (firstName.dirty || firstName.touched)
      }">
      <label>First Name</label>
      <input type="text"
             class="form-control"
             formControlName="firstName"
             required>
      <div class="form-control-feedback"
           *ngIf="firstName.errors && (firstName.dirty || firstName.touched)">
        <p *ngIf="firstName.errors.required">Last Name is required</p>
      </div>

      <!--
        <pre>Valid? {{ myform.controls.name.controls.firstName.valid }}</pre>
        <pre>Dirty? {{ myform.controls.name.controls.firstName.dirty }}</pre>
      -->
    </div>

    <div class="form-group"
         [ngClass]="{
        'has-danger': lastName.invalid && (lastName.dirty || lastName.touched),
        'has-success': lastName.valid && (lastName.dirty || lastName.touched)
      }">
      <label>Last Name</label>
      <input type="text"
             class="form-control"
             formControlName="lastName"
             required>
      <div class="form-control-feedback"
           *ngIf="lastName.errors && (lastName.dirty || lastName.touched)">
        <p *ngIf="lastName.errors.required">Last Name is required</p>
      </div>
    </div>
  </fieldset>


  <div class="form-group"
       [ngClass]="{
        'has-danger': email.invalid && (email.dirty || email.touched),
        'has-success': email.valid && (email.dirty || email.touched)
   }">
    <label>Email</label>
    <input type="email"
           class="form-control"
           formControlName="email"
           required>
    <div class="form-control-feedback"
         *ngIf="email.errors && (email.dirty || email.touched)">
      <p *ngIf="email.errors.required">Email is required</p>
      <p *ngIf="email.errors.pattern">The email address must contain at least the @ character</p>
    </div>

    <!--
      <pre>Valid? {{ myform.controls.email.valid }}</pre>
      <pre>Dirty? {{ myform.controls.email.dirty }}</pre>
    -->

  </div>

  <div class="form-group"
       [ngClass]="{
        'has-danger': password.invalid && (password.dirty || password.touched),
        'has-success': password.valid && (password.dirty || password.touched)
   }">
    <label>Password</label>
    <input type="password"
           class="form-control"
           formControlName="password"
           required>
    <div class="form-control-feedback"
         *ngIf="password.errors && (password.dirty || password.touched)">
      <p *ngIf="password.errors.required">Password is required</p>
      <p *ngIf="password.errors.minlength">Password must be 8 characters long, we need another {{password.errors.minlength.requiredLength - password.errors.minlength.actualLength}} characters </p>
    </div>
  </div>

  <!-- 
    <pre>{{ language.errors | json }}</pre>
  -->

  <div class="form-group"
       [ngClass]="{
        'has-danger': language.invalid && (language.dirty || language.touched),
        'has-success': language.valid && (language.dirty || language.touched)
      }">
    <label>Language</label>
    <select class="form-control"
            formControlName="language">
      <option value="">Please select a language</option>
      <option *ngFor="let lang of langs"
              [value]="lang">{{lang}}
      </option>
    </select>
  </div>

  <button type="submit"
          class="btn btn-primary">Submit
  </button>

  <pre>{{myform.value | json}}</pre>
</form>
</div>`
})
class ModelFormComponent implements OnInit {
  langs: string[] = [
    'English',
    'French',
    'German',
  ];
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;


  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
      language: this.language
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted!");
      this.myform.reset();
    }
  }
}


@Component({
  selector: 'app',
  template: `<model-form></model-form>`
})
class AppComponent {
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule],
  declarations: [
    AppComponent,
    ModelFormComponent
  ],
  bootstrap: [
    AppComponent
  ],
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);