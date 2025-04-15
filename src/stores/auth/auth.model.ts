export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface User {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly photoURL: string | null;
  readonly uid: string;
}
