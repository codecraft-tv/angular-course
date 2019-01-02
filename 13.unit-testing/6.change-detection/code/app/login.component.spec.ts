/* tslint:disable:no-unused-variable */
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
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

    it('login button hidden when the user is authenticated', () => {
        // To being with Angular has not done any change detection so the content is blank.
        expect(el.nativeElement.textContent.trim()).toBe('');

        // Trigger change detection and this lets the template update to the initial value which is Login since by
        // default we are not authenticated
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Login');

        // Change the authetication state to true
        spyOn(authService, 'isAuthenticated').and.returnValue(true);

        // The label is still Login! We need changeDetection to run and for angular to update the template.
        expect(el.nativeElement.textContent.trim()).toBe('Login');
        // Which we can trigger via fixture.detectChange()
        fixture.detectChanges();

        // Now the label is Logout
        expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
});