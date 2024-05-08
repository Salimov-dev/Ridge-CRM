import { IUser } from "./user.interface";

export interface IUserStoreInitialState {
  entities: IUser[];
  isLoading: boolean;
  error: any;
  auth: { userId: string | null };
  isLoggedIn: boolean;
  dataLoaded: boolean;
}
