/* tslint:disable:no-unused-variable */
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";

describe('Component: Login', () => {

    let component: LoginComponent;
    let service: AuthService;
    let spy: any;

    beforeEach(() => {
        service = new AuthService();
        component = new LoginComponent(service);
    });

    afterEach(() => {
        service = null;
        component = null;
    });


    it('needsLogin returns true when the user has not been authenticated', () => {
        spy = spyOn(service, 'isAuthenticated').and.returnValue(false);
        expect(component.needsLogin()).toBeTruthy();
        expect(service.isAuthenticated).toHaveBeenCalled();

    });

    it('needsLogin returns false when the user has been authenticated', () => {
        spy = spyOn(service, 'isAuthenticated').and.returnValue(true);
        expect(component.needsLogin()).toBeFalsy();
        expect(service.isAuthenticated).toHaveBeenCalled();
    });
});
