export interface IUser {
  activationLink: string | null;
  birthday: string | null;
  city: string;
  color: string;
  created_at: string;
  curatorId: string | null;
  email: string;
  firstName: string | null;
  gender: string | null;
  isActive: boolean;
  isEmailActived: boolean;
  lastName: string | null;
  phone: string | null;
  recoveryPassLink: string | null;
  role: string[];
  setupPassLink: string | null;
  status: string;
  surName: string | null;
  updated_at: string;
  _id: string;
}
