import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import dayjs from "dayjs";
// utils
import { enterPhoneFormat } from "../../../../utils/data/enter-phone-format";
import { getPriceForRentMetr } from "../../../../utils/data/get-price-rent-for-metr";
// store
import { getMetroName } from "../../../../store/object/metro.store";
import { getObjectById } from "../../../../store/object/objects.store";
import { getUserNameById } from "../../../../store/user/users.store";
import { getDistrictById } from "../../../../store/object/districts.store";
import { getRentTypeNameById } from "../../../../store/object/rent-types.store";
import { getObjectTypeNameById } from "../../../../store/object/object-types.store";
import { getEstateTypeNameById } from "../../../../store/object/estate-types.store";
import { getObjectStatusNameById } from "../../../../store/object/object-status.store";
import { getCurrentRenterNameById } from "../../../../store/object/current-renter.store";
import { getWorkingPositionNameById } from "../../../../store/user/working-position.store";
import { getEstateConditionNameById } from "../../../../store/object/object-conditions.store";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};

export const FormatManagerName = (id) => {
  return useSelector(getUserNameById(id));
};

export const FormatPhone = (num) => {
  return enterPhoneFormat(num);
};

export const FormatDistrict = (id) => {
  return useSelector(getDistrictById(id));
};

export const FormatObjectStatus = (id) => {
  return useSelector(getObjectStatusNameById(id));
};

export const FormatTypeObject = (id) => {
  return useSelector(getObjectTypeNameById(id));
};

export const FormatTypeEstate = (id) => {
  return useSelector(getEstateTypeNameById(id));
};

export const FormatTypeRent = (id) => {
  return useSelector(getRentTypeNameById(id));
};

export const FormatCurrentRenter = (id) => {
  return useSelector(getCurrentRenterNameById(id));
};

export const FormatEstateConditions = (id) => {
  return useSelector(getEstateConditionNameById(id));
};

export const FormatWorkingPosition = (id) => {
  return useSelector(getWorkingPositionNameById(id));
};

export const FormatMetro = (id) => {
  return useSelector(getMetroName(id));
};

export const priceForMetr = (id) => {
  const object = useSelector(getObjectById(id));
  return getPriceForRentMetr(object);
};

export const UserAvatar = ({ path }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={path} alt="" style={{ width: "40px", borderRadius: "4px" }} />
    </Box>
  );
};
