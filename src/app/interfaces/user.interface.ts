import { IUserAuthentication } from "./userAuthentication.interface";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  authentication: IUserAuthentication;
}
