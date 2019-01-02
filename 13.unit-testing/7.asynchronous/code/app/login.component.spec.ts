/* tslint:disable:no-unused-variable */
import { TestBed, async, whenStable, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let el: DebugElement;

    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // UserService provided to the TestBed
        authService = TestBed.get(AuthService);

        //  get the "a" element by CSS selector (e.g., by class name)
        el = fixture.debugElement.query(By.css('a'));
    });

    it('Button label via fakeAsync() and tick()', fakeAsync(() => {
        expect(el.nativeElement.textContent.trim()).toBe('');
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');

        spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

        component.ngOnInit();
        // Simulates the passage of time until all pending asynchronous activities complete
        tick();
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
    }));

    it('Button label via async() and whenStable()', async(() => {
        // async() knows about all the pending promises defined in it's function body.
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));

        fixture.whenStable().then(() => {
            // This is called when ALL pending promises have been resolved
            fixture.detectChanges();
            expect(el.nativeElement.textContent.trim()).toBe('Logout');
        });

        component.ngOnInit();

    }));

    it('Button label via jasmine.done', (done) => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');

        // Make the authService return a promise that resolves to true
        let spy = spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
        // We trigger the component to check the authService again
        component.ngOnInit();

        // We now want to call a function when the Promise returned from authService.isAuthenticated() is resolved
        spy.calls.mostRecent().returnValue.then(() => {
            // The needsChanged boolean has been updated on the Component so to update the template we trigger change detection
            fixture.detectChanges();
            // Now the label is Logout
            expect(el.nativeElement.textContent.trim()).toBe('Logout');
            // We tell jasmine we are done with this test spec
            done();
        });
    });
});