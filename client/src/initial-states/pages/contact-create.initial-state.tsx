import { IContactCreateInitState } from "@interfaces/contact/contact.inteface";

export const contactCreateInitialState: IContactCreateInitState = {
  name: "",
  position: "",
  comment: "",
  phones: [{ phone: "", isDefault: true }],
  emails: [],
  companies: [],
  objects: []
};
