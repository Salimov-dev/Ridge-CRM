import { gendersArray } from "@data/genders";

export const getGenderName = (gender) => {
  return gendersArray.find((gen) => gen?._id === gender)?.name;
};
