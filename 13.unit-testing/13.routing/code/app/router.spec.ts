/* tslint:disable:no-unused-variable */
import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { HomeComponent, SearchComponent, AppComponent, routes } from "./router";

describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, SearchComponent, AppComponent]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/home");
    });
  }));

  it('navigate to "search" takes you to /search', fakeAsync(() => {
    router.navigate(["/search"]).then(() => {
      expect(location.path()).toBe("/search");
    });
  }));
});
