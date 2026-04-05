export interface authService {
  loginUser(email: string, rawPassword: string): Promise<string>;
}
