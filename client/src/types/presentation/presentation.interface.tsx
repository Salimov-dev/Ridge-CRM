export interface IPresentation {
  _id: string;
  userId: string;
  objectId: string;
  status: string;
  result: string | null;
  cloudLink: string | null;
  curatorComment: string;
  created_at: string;
  updated_at: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}
