export interface ICompany {
  _id: string;
  userId: string;
  name: string;
  profile: string;
  objects: string[];
  contacts: string[];
  created_at: string;
  updated_at: string;
}

export interface ICompanyCreateInitState {
  name: string;
  profile: string;
  contacts: string[];
  objects: string[];
}
