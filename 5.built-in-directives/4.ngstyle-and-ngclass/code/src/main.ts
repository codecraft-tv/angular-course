import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@Component({
  selector: "ngstyle-example",
  template: `<h4>NgStyle</h4>
<ul *ngFor="let person of people">
  <li [ngStyle]="{'font-size.px':24}"
      [style.color]="getColor(person.country)">
    {{ person.name }} ({{ person.country }})
  </li>
</ul>
 `
})
class NgStyleExampleComponent {
  getColor(country) {
    switch (country) {
      case "UK":
        return "green";
      case "USA":
        return "blue";
      case "HK":
        return "red";
    }
  }

  people: any[] = [
    {
      name: "Douglas  Pace",
      country: "UK"
    },
    {
      name: "Mcleod  Mueller",
      country: "USA"
    },
    {
      name: "Day  Meyers",
      country: "HK"
    },
    {
      name: "Aguirre  Ellis",
      country: "UK"
    },
    {
      name: "Cook  Tyson",
      country: "USA"
    }
  ];
}

@Component({
  selector: "ngclass-example",
  template: `<h4>NgClass</h4>
<ul *ngFor="let person of people">
  <li [ngClass]="{
  'text-success':person.country === 'UK',
  'text-primary':person.country === 'USA',
  'text-danger':person.country === 'HK'
  }">
  {{ person.name }} ({{ person.country }})
  </li>
</ul>
<ul *ngFor="let person of people">
  <li [class.text-success]="person.country === 'UK'"
      [class.text-primary]="person.country === 'USA'"
      [class.text-danger]="person.country === 'HK'">
    {{ person.name }} ({{ person.country }})
  </li>
</ul>
 `
})
class NgClassExampleComponent {
  people: any[] = [
    {
      name: "Douglas  Pace",
      age: 35,
      country: "UK"
    },
    {
      name: "Mcleod  Mueller",
      age: 32,
      country: "USA"
    },
    {
      name: "Day  Meyers",
      age: 21,
      country: "HK"
    },
    {
      name: "Aguirre  Ellis",
      age: 34,
      country: "UK"
    },
    {
      name: "Cook  Tyson",
      age: 32,
      country: "USA"
    }
  ];
}

@Component({
  selector: "directives-app",
  template: `
<ngclass-example></ngclass-example>
<ngstyle-example></ngstyle-example>`
})
class DirectivesAppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    NgClassExampleComponent,
    NgStyleExampleComponent,
    DirectivesAppComponent
  ],
  bootstrap: [DirectivesAppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);