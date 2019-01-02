/* tslint:disable:no-unused-variable */
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";

// - Mocking by overriding functions
//
// class MockAuthService extends AuthService {
// 	authenticated = false;
//
// 	isAuthenticated() {
// 		return this.authenticated;
// 	}
// }


// - Mocking with fake classes
//
// import {LoginComponent} from './login.component';
//
// class MockAuthService {
// 	authenticated = false;
//
// 	isAuthenticated() {
// 		return this.authenticated;
// 	}
// }
//
// describe('Component: Login', () => {
//
// 	let component: LoginComponent;
// 	let service: MockAuthService;
//
// 	beforeEach(() => {
// 		service = new MockAuthService();
// 		component = new LoginComponent(service);
// 	});
//
// 	afterEach(() => {
// 		service = null;
// 		component = null;
// 	});
//
//
// 	it('canLogin returns false when the user is not authenticated', () => {
// 		service.authenticated = false;
// 		expect(component.needsLogin()).toBeTruthy();
// 	});
//
// 	it('canLogin returns false when the user is not authenticated', () => {
// 		service.authenticated = true;
// 		expect(component.needsLogin()).toBeFalsy();
// 	});
// });


// - Testing with the real `AuthService`
//
// import {LoginComponent} from './login.component';
// import {AuthService} from "./auth.service";
//
// describe('Component: Login', () => {
//
// 	let component: LoginComponent;
// 	let service: AuthService;
//
// 	beforeEach(() => {
// 		service = new AuthService();
// 		component = new LoginComponent(service);
// 	});
//
// 	afterEach(() => {
// 		localStorage.removeItem('token');
// 		service = null;
// 		component = null;
// 	});
//
//
// 	it('canLogin returns false when the user is not authenticated', () => {
// 		expect(component.needsLogin()).toBeTruthy();
// 	});
//
// 	it('canLogin returns false when the user is not authenticated', () => {
// 		localStorage.setItem('token', '12345');
// 		expect(component.needsLogin()).toBeFalsy();
// 	});
// });
