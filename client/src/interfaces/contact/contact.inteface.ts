export interface IContact {
  _id: string;
  userId: string;
  name: string;
  position: ContactPositions;
  comment: string;
  emails: string[];
  companies: string[];
  phones: PhoneNumber[];
  objectId: string;
  created_at: string;
  updated_at: string;
}

export interface IContactCreateInitState {
  name: string;
  position: string;
  comment: string;
  phones: any;
  emails: any;
  companies: any;
  objects: any;
}

export enum ContactPositions {
  OwnerRepresentative = "64c13f8e6a53baca70b5e201",
  Owner = "64c13f8e6a53baca70b5e200",
  RentalDepartment = "64c13f8e6a53baca70b5e202",
  ManagementCompany = "64c13f8e6a53baca70b5e208",
  Unknown = "64c13f8e6a53baca70b5e205",
  Agent = "64c13f8e6a53baca70b5e204"
}

export type PhoneNumber = { phone: string; isDefault: boolean };
