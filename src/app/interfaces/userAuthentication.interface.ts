export interface IUserAuthentication {
  password: string;
  salt?: string;
  sessionToken?: string;
  role: string
}