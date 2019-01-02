export class AuthService {
    isAuthenticated(): Promise<boolean> | boolean | string {
        return Promise.resolve(!!localStorage.getItem('token'));
    }
}