import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ngif-example',
  template: `
<h4>NgIf</h4>
<ul *ngFor="let person of people">
  <li *ngIf="person.age < 30">
    {{ person.name }} ({{ person.age }})
  </li>
</ul>
`
})
class NgIfExampleComponent {

  people: any[] = [
    {
      "name": "Douglas  Pace",
      "age": 35
    },
    {
      "name": "Mcleod  Mueller",
      "age": 32
    },
    {
      "name": "Day  Meyers",
      "age": 21
    },
    {
      "name": "Aguirre  Ellis",
      "age": 34
    },
    {
      "name": "Cook  Tyson",
      "age": 32
    }
  ];
}


@Component({
  selector: 'ngswitch-example',
  template: `<h4>NgSwitch</h4>
<ul *ngFor="let person of people"
    [ngSwitch]="person.country">
  <li *ngSwitchCase="'UK'"
      class="text-success">
    {{ person.name }} ({{ person.country }})
  </li>
  <li *ngSwitchCase="'USA'"
      class="text-primary">
    {{ person.name }} ({{ person.country }})
  </li>
  <li *ngSwitchCase="'HK'"
      class="text-danger">
    {{ person.name }} ({{ person.country }})
  </li>
  <li *ngSwitchDefault
      class="text-warning">
    {{ person.name }} ({{ person.country }})
  </li>
</ul>`
})
class NgSwitchExampleComponent {

  people: any[] = [
    {
      "name": "Douglas  Pace",
      "age": 35,
      "country": 'MARS'
    },
    {
      "name": "Mcleod  Mueller",
      "age": 32,
      "country": 'USA'
    },
    {
      "name": "Day  Meyers",
      "age": 21,
      "country": 'HK'
    },
    {
      "name": "Aguirre  Ellis",
      "age": 34,
      "country": 'UK'
    },
    {
      "name": "Cook  Tyson",
      "age": 32,
      "country": 'USA'
    }
  ];
}


@Component({
  selector: 'directives-app',
  template: `
  <ngswitch-example></ngswitch-example>
  <ngif-example></ngif-example>
 `
})
class DirectivesAppComponent {
}


@NgModule({
  imports: [BrowserModule],
  declarations: [
    NgIfExampleComponent,
    NgSwitchExampleComponent,
    DirectivesAppComponent],
  bootstrap: [DirectivesAppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);