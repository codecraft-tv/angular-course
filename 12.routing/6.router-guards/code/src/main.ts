import { NgModule, Component, Injectable } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ReactiveFormsModule, FormControl, FormsModule } from "@angular/forms";
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HttpClient
} from "@angular/common/http";
import {
  Routes,
  RouterModule,
  Router,
  ActivatedRoute,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

// Domain models

class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}

// Services

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

@Injectable()
class UserService {
  isLoggedIn(): boolean {
    return false; // Switch to `false` to make OnlyLoggedInUsersGuard work
  }
}

// Components

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
          (click)="onSearch(search.value)">
    Search
  </button>
</form>

<hr />

<div class="text-center">
  <p class="lead"
     *ngIf="loading">Loading...</p>
</div>

<div class="list-group">
  <a [routerLink]="['/artist', track.artistId]"
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

  constructor(
    private itunes: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["term"]) {
        this.doSearch(params["term"]);
      }
    });
  }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then(_ => (this.loading = false));
  }

  onSearch(term: string) {
    this.router.navigate(["search", { term: term }]);
  }

  canDeactivate() {
    return this.itunes.results.length > 0;
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
  selector: "app-artist-track-list",
  template: `
<ul class="list-group">
	<li class="list-group-item"
	    *ngFor="let track of tracks">
		<img src="{{track.artworkUrl30}}">
		<a target="_blank"
		   href="{{track.trackViewUrl}}">{{ track.trackName }}
		</a>
	</li>
</ul>
 `
})
class ArtistTrackListComponent {
  private tracks: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=song`,
          "callback"
        )
        .toPromise()
        .then(res => {
          console.log(res);
          this.tracks = res.results.slice(1);
        });
    });
  }
}

@Component({
  selector: "app-artist-album-list",
  template: `<ul class="list-group">
	<li class="list-group-item"
	    *ngFor="let album of albums">
		<img src="{{album.artworkUrl60}}">
		<a target="_blank"
		   href="{{album.collectionViewUrl}}">{{ album.collectionName }}
		</a>
	</li>
</ul>
 `
})
class ArtistAlbumListComponent {
  private albums: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=album`,
          "callback"
        )
        .toPromise()
        .then(res => {
          console.log(res);
          this.albums = res.results.slice(1);
        });
    });
  }
}

@Component({
  selector: "app-artist",
  template: `<div class="card">
  <div class="card-block">
    <h4>{{artist?.artistName}} <span class="tag tag-default">{{artist?.primaryGenreName}}</span></h4>
    <hr />
    <footer>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="['./tracks']">Tracks
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             [routerLinkActive]="['active']"
             [routerLink]="['./albums']">Albums
          </a>
        </li>
      </ul>
    </footer>
  </div>
</div>

<div class="m-t-1">
  <router-outlet></router-outlet>
</div>
 `
})
class ArtistComponent {
  private artist: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${params["artistId"]}`,
          "callback"
        )
        .toPromise()
        .then(res => {
          console.log(res);
          this.artist = res.results[0];
          console.log(this.artist);
        });
    });
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

// Guards

class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    console.log("AlwaysAuthGuard");
    return true;
  }
}

@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}

class AlwaysAuthChildrenGuard implements CanActivateChild {
  canActivateChild() {
    console.log("AlwaysAuthChildrenGuard");
    return true;
  }
}

class UnsearchedTermGuard implements CanDeactivate<SearchComponent> {
  canDeactivate(
    component: SearchComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("UnsearchedTermGuard");
    console.log(state.url);
    return component.canDeactivate() || window.confirm("Are you sure?");
  }
}

// Routes

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "find", redirectTo: "search" },
  { path: "home", component: HomeComponent },
  {
    path: "search",
    component: SearchComponent,
    canDeactivate: [UnsearchedTermGuard]
  },
  {
    path: "artist/:artistId",
    component: ArtistComponent,
    canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard],
    canActivateChild: [AlwaysAuthChildrenGuard],
    children: [
      { path: "", redirectTo: "tracks", pathMatch: "full" },
      { path: "tracks", component: ArtistTrackListComponent },
      { path: "albums", component: ArtistAlbumListComponent }
    ]
  },
  { path: "**", component: HomeComponent }
];

// Bootstrap

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    HeaderComponent,
    ArtistAlbumListComponent,
    ArtistTrackListComponent,
    ArtistComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    SearchService,
    UserService,
    OnlyLoggedInUsersGuard,
    AlwaysAuthGuard,
    AlwaysAuthChildrenGuard,
    UnsearchedTermGuard
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);