import decode from "jwt-decode";

class AuthService {
    // Retrieve data saved in toke
    getProfile() {
        return decode(this.getToken());
    }

    // Check if the User is still logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();

        // Use Type Coersion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // Check if the Token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    // Retrieve Token from localStorage
    getToken() {
        // Retrieves the User Token from localStorage
        return localStorage.getItem('id_token');
    }

    // Set Token to localStorage and reload page to homepage
    login(idToken) {
        // Saves User token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // Clear Token from localStorage and Force logout with reload
    logout() {
        // Clear User Token and Profile Data from localStorage
        localStorage.removeItem('id_token');
        // This will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();