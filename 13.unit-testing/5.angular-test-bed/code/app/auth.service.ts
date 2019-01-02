export class AuthService {
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}