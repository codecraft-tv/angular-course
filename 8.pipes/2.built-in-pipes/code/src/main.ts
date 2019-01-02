import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'pipe-builtins',
  template: `<div class="card card-block">
  <h4 class="card-title">Currency</h4>
  <div class="card-text">
    <p ngNonBindable>{{ 1234.56 | currency:'CAD' }}</p>
    <p>{{ 1234.56 | currency:"CAD" }}</p>

    <p ngNonBindable>{{ 1234.56 | currency:'CAD':'code' }}</p>
    <p>{{ 1234.56 | currency:'CAD':'code'}}</p>

    <p ngNonBindable>{{ 1234.56 | currency:'CAD':'symbol' }}</p>
    <p>{{ 1234.56 | currency:'CAD':'symbol'}}</p>

    <p ngNonBindable>{{ 1234.56 | currency:'CAD':'symbol-narrow' }}</p>
    <p>{{ 1234.56 | currency:'CAD':'symbol-narrow'}}</p>
  </div>
</div>

<div class="card card-block">
  <h4 class="card-title">Date</h4>
  <div class="card-text">
    <p ngNonBindable>{{ dateVal | date: 'shortTime' }}</p>
    <p>{{ dateVal | date: 'shortTime' }}</p>

    <p ngNonBindable>{{ dateVal | date:'fullDate' }}</p>
    <p>{{ dateVal | date: 'fullDate' }}</p>

    <p ngNonBindable>{{ dateVal | date: 'shortTime' }}</p>
    <p>{{ dateVal | date: 'shortTime' }}</p>

    <p ngNonBindable>{{ dateVal | date: 'd/M/y' }}</p>
    <p>{{ dateVal | date: 'd/M/y' }}</p>
  </div>
</div>

<div class="card card-block">
  <div class="card-text">
    <h4 class="card-title">DecimalPipe</h4>
    <p ngNonBindable>{{ 3.14159265 | number: '3.1-2' }}</p>
    <p>{{ 3.14159265 | number: '3.1-2' }}</p>

    <p ngNonBindable>{{ 3.14159265 | number: '1.4-4' }}</p>
    <p>{{ 3.14159265 | number: '1.4-4' }}</p>
  </div>
</div>

<div class="card card-block">
  <h4 class="card-title">JsonPipe</h4>
  <div class="card-text">
    <p ngNonBindable>{{ jsonVal }}</p>
    <p>{{ jsonVal }}</p>

    <p ngNonBindable>{{ jsonVal | json }}</p>
    <pre>{{ jsonVal | json }}</pre>
  </div>
</div>


<div class="card card-block">
  <h4 class="card-title">LowerCasePipe</h4>
  <div class="card-text">
    <p ngNonBindable>{{ 'ASIM' | lowercase }}</p>
    <p>{{ 'ASIM' | lowercase }}</p>
  </div>
</div>

<div class="card card-block">
  <h4 class="card-title">UpperCasePipe</h4>
  <div class="card-text">
    <p ngNonBindable>{{ 'asim' | uppercase }}</p>
    <p>{{ 'asim' | uppercase }}</p>
  </div>
</div>

<div class="card card-block">
  <h4 class="card-title">PercentPipe</h4>
  <div class="card-text">
    <p ngNonBindable>{{ 0.123456 | percent }}</p>
    <p>{{ 0.123456 | percent }}</p>

    <p ngNonBindable>{{ 0.123456 | percent: '2.1-2' }}</p>
    <p>{{ 0.123456 | percent: '2.1-2' }}</p>

    <p ngNonBindable>{{ 42 | percent: '10.4-4' }}</p>
    <p>{{ 0.123456 | percent : "10.4-4" }}</p>
  </div>
</div>

<div class="card card-block">
  <h4 class="card-title">SlicePipe</h4>
  <div class="card-text">
    <p ngNonBindable>{{ [1,2,3,4,5,6] | slice:1:3 }}</p>
    <p>{{ [1,2,3,4,5,6] | slice:1:3 }}</p>

    <p ngNonBindable>{{ [1,2,3,4,5,6] | slice:2 }}</p>
    <p>{{ [1,2,3,4,5,6] | slice:2 }}</p>

    <p ngNonBindable>{{ [1,2,3,4,5,6] | slice:2:-1 }}</p>
    <p>{{ [1,2,3,4,5,6] | slice:2:-1 }}</p>

    <pre ngNonBindable>
&lt;ul&gt;
  &lt;li *ngFor=&quot;let v of [1,2,3,4,5,6] | slice:2:-1&quot;&gt;
    {{v}}
  &lt;/li&gt;
&lt;/ul&gt;
    </pre>

    <ul>
      <li *ngFor="let v of [1,2,3,4,5,6] | slice:2:-1">
        {{v}}
      </li>
    </ul>
  </div>
</div>

 `
})
class PipeBuiltinsComponent {
  private dateVal: Date = new Date();
  private jsonVal: Object = {moo: 'foo', goo: {too: 'new'}};

}

@Component({
  selector: 'app',
  template: `
<pipe-builtins></pipe-builtins>
 `
})
class AppComponent {
}


@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent,
    PipeBuiltinsComponent
  ],
  bootstrap: [AppComponent],
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);