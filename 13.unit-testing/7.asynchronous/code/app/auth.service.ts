export class AuthService {
    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(!!localStorage.getItem('token'));
    }
}