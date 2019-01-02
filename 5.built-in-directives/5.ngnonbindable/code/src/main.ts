import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'ngnonbindable-example',
  template: `<h4>NgNonBindable</h4>
<div>
  To render the name variable we use this syntax
  <pre ngNonBindable>{{ name }}</pre>
</div>  
 `
})
class NgNonBindableExampleComponent {
}

@Component({
  selector: 'directives-app',
  template: `<ngnonbindable-example></ngnonbindable-example>`
})
class DirectivesAppComponent {
}


@NgModule({
  imports: [BrowserModule],
  declarations: [NgNonBindableExampleComponent, DirectivesAppComponent],
  bootstrap: [DirectivesAppComponent],
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);