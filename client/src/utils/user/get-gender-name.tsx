import { userGendersArray } from "@data/users/user-genders";

export const getGenderName = (gender) => {
  return userGendersArray.find((gen) => gen?._id === gender)?.name;
};
