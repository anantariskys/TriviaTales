import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';


// Definisikan tipe untuk data autentikasi
interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  userData: UserData | undefined;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isValidated: boolean | undefined;
  isDataLoaded: boolean;
}

interface UserData {
  alamat?: string;
  contact?: string;
  [key: string]: any; // Tambahkan ini jika `userData` memiliki properti lain
}

interface AuthProviderProps {
  children: ReactNode;
}

// Buat Context dengan tipe default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook untuk mengakses AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Komponen AuthProvider dengan tipe
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!window.localStorage.getItem('token'));
  const [isValidated, setIsValidated] = useState<boolean | undefined>();
  const [userData, setUserData] = useState<UserData | undefined>();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(!!window.localStorage.getItem('token'));
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
             setIsDataLoaded(true);
      } catch (error: any) {
        if (error.response?.statusText === 'Unauthorized') {
          window.localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
        setIsDataLoaded(true);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const logout = () => {
    window.localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        userData,
        setIsAuthenticated,
        isValidated,
        isDataLoaded,
      }}
    >
      {isDataLoaded && children}
    </AuthContext.Provider>
  );
};
