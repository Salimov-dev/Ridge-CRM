import { IUser } from "../user/user.types";

export interface IUserStoreInitialState {
  entities: IUser[];
  isLoading: boolean;
  error: any;
  auth: { userId: string | null };
  isLoggedIn: boolean;
  dataLoaded: boolean;
}
