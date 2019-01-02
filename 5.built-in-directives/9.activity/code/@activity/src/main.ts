import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    NgModule
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


class Article {
  constructor(public title: string,
              public date: Date,
              public content: string,
              public kind: string) {
  }
}


@Component({
  selector: 'recent-articles',
  template: `<div class="col-md-4">
  <div class="card card-outline-primary">
    <div class="card-block">
      <h4 class="card-title">Title</h4>
      <p class="card-text">Content</p>
      <p class="card-text">
        <small class="text-muted">Something</small>
      </p>
    </div>
    <img class="card-img-bottom img-fluid"
         src="https://unsplash.it/400?image=11">
  </div>
</div>
`
})
class RecentArticlesComponent {

  articles: Article[] = [
    new Article("Title 1", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 2", new Date(), "https://unsplash.it/400?image=10", "image"),
    new Article("Title 3", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 4", new Date(), "https://unsplash.it/400?image=20", "image"),
    new Article("Title 5", new Date(), "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula", "text"),
    new Article("Title 6", new Date(), "https://unsplash.it/400?image=30", "image")
  ];
}


@Component({
  selector: 'app',
  template: `
<div class="row">
  <recent-articles></recent-articles>
  </div>
`
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    RecentArticlesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);