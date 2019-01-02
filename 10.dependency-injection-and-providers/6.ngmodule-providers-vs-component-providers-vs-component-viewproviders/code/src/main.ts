import { NgModule, Component, Injectable } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

class SimpleService {
  value: string;
}

@Component({
  selector: "child",
  template: `
 <div class="child"> 
   <p>Child</p>
   {{ service.value }}
</div>
 `,
  styles: [
    `
      .child {
        background-color: #239cde;
        padding: 10px;
      }
    `
  ]
  // providers: [SimpleService]
})
class ChildComponent {
  constructor(private service: SimpleService) {}
}

@Component({
  selector: "parent",
  template: `
 <div class="parent"> 
   <p>Parent</p>
   <form novalidate>
  			<div class="form-group">
  			<input type="text"
  			       class="form-control"
  			       name="value"
  			       [(ngModel)]="service.value">
  		</div>
  </form>
  <ng-content></ng-content>
</div>
 `,
  styles: [
    `
      .parent {
        background-color: #d1e751;
        padding: 10px;
      }
    `
  ],
  viewProviders: [SimpleService]
  // providers: [SimpleService]
})
class ParentComponent {
  constructor(private service: SimpleService) {}
}

@Component({
  selector: "app",
  template: `
 <div class="row">
	<div class="col-xs-6">
		<parent><child></child></parent>
	</div>
	<div class="col-xs-6">
		<parent><child></child></parent>
	</div>
</div>
 `
})
class AppComponent {}

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ParentComponent, ChildComponent],
  bootstrap: [AppComponent],
  providers: [SimpleService]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);