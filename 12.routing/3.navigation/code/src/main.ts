import { NgModule, Component, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import { Routes, RouterModule, Router } from "@angular/router";
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HttpClient
} from "@angular/common/http";

class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}

@Injectable()
class SearchService {
  apiRoot: string = "https://itunes.apple.com/search";
  results: SearchItem[];

  constructor(private http: HttpClient) {
    this.results = [];
  }

  search(term: string) {
    return new Promise((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      this.http
        .jsonp(apiURL, "callback")
        .toPromise()
        .then(
          res => {
            // Success
            this.results = res.results.map(item => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            });
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
  }
}

@Component({
  selector: "app-search",
  template: `<form class="form-inline">
  <div class="form-group">
    <input type="search"
           class="form-control"
           placeholder="Enter search string"
           #search>
  </div>
  <button type="button"
          class="btn btn-primary"
          (click)="doSearch(search.value)">
    Search
  </button>
</form>

<hr />

<div class="text-center">
  <p class="lead"
     *ngIf="loading">Loading...</p>
</div>

<div class="list-group">
  <a href="#"
     class="list-group-item list-group-item-action"
     *ngFor="let track of itunes.results">
    <img src="{{track.thumbnail}}">
    {{ track.name }} <span class="text-muted">by</span> {{ track.artist }}
  </a>
</div>
 `
})
class SearchComponent {
  private loading: boolean = false;

  constructor(private itunes: SearchService) {}

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then(_ => (this.loading = false));
  }
}

@Component({
  selector: "app-home",
  template: `
<div class="jumbotron">
  <h1 class="display-3">iTunes Search App</h1>
</div>
 `
})
class HomeComponent {}

@Component({
  selector: "app-header",
  template: `<nav class="navbar navbar-light bg-faded">
  <a class="navbar-brand"
     [routerLink]="['home']">iTunes Search App
  </a>
  <ul class="nav navbar-nav">
    <li class="nav-item"
        [routerLinkActive]="['active']">
      <a class="nav-link"
         [routerLink]="['home']">Home
      </a>
    </li>
    <li class="nav-item"
        [routerLinkActive]="['active']">
      <a class="nav-link"
         [routerLink]="['search']">Search
      </a>
    </li>
  </ul>
</nav>
 `
})
class HeaderComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate([""]);
  }

  goSearch() {
    this.router.navigate(["search"]);
  }
}

@Component({
  selector: "app",
  template: `
	<app-header></app-header>
	<div class="m-t-1">
    <router-outlet></router-outlet>
  </div>
 `
})
class AppComponent {}

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "find", redirectTo: "search" },
  { path: "home", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [AppComponent, SearchComponent, HomeComponent, HeaderComponent],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);