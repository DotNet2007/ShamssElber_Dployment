export interface User {
  id: number;
  userName: string;
  companyCode: number;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}