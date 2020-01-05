/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;

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

    });

    it('needsLogin returns true when the user has not been authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(false);
        expect(component.needsLogin()).toBeTruthy();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });

    it('needsLogin returns false when the user has been authenticated', () => {
        spyOn(authService, 'isAuthenticated').and.returnValue(true);
        expect(component.needsLogin()).toBeFalsy();
        expect(authService.isAuthenticated).toHaveBeenCalled();
    });
});
