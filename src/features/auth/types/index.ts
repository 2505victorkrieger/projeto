export type AuthView = "login" | "register" | "forgot-password";

export interface AuthContextType {
  view: AuthView;
  setView: (view: AuthView) => void;
}
