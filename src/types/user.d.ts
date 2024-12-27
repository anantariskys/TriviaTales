
export interface GoogleUserInfo {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
    sub: string;
  }

  export interface TokenResponse {
    access_token: string;
  }
  
  
  export interface AuthState {
    isAuthenticated: boolean;
    userData: GoogleUserInfo| null;
    isLoading: boolean;
    setIsAuthenticated: (nowIsAuthenticated: boolean)=>void;
    setIsLoading: (nowIsLoading:boolean) => void;
    setAuth: (authData: GoogleUserInfo) => void;
    clearAuth: () => void;
  }
  