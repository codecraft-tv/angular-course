/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";

class MockAuthService extends AuthService {
    isAuthenticated() {
        return 'Mocked';
    }
}


describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let testBedService: AuthService;
    let componentService: AuthService;

    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        // Configure the component with another set of Providers
        TestBed.overrideComponent(
            LoginComponent,
            { set: { providers: [{ provide: AuthService, useClass: MockAuthService }] } }
        );

        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // AuthService provided to the TestBed
        testBedService = TestBed.get(AuthService);

        // AuthService provided by Component, (should return MockAuthService)
        componentService = fixture.debugElement.injector.get(AuthService);
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
        inject([AuthService], (injectService: AuthService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('Service injected via component should be and instance of MockAuthService', () => {
        expect(componentService instanceof MockAuthService).toBeTruthy();
    });
});