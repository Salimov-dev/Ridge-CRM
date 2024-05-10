export interface IPresentation {
  _id: string;
  userId: string;
  objectId: string;
  status: PresentationAgreementStatuses;
  result: string | null;
  cloudLink: string | null;
  curatorComment: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface IPresentationCreateInitState {
  objectId: string;
  cloudLink: string | null;
}

export enum PresentationAgreementStatuses {
  ToBeAgreed = "654wqeg3469y9dfsd82dd334",
  Refused = "654wqeporew325iugfu43005",
  Agreed = "654wqepvmq49450iqw23fd68",
  Finalize = "654wqe92hc0siq123of00q99"
}
