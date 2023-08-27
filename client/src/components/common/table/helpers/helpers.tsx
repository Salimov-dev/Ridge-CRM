import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
// utils
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";
// store
import { getMetroName } from "../../../../store/metro.store";
import { getObjectById } from "../../../../store/objects.store";
import { getUserNameById } from "../../../../store/users.store";
import { getDistrictById } from "../../../../store/districts.store";
import { getRentTypeNameById } from "../../../../store/rent-types.store";
import { getObjectTypeNameById } from "../../../../store/object-types.store";
import { getEstateTypeNameById } from "../../../../store/estate-types.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getPriceForRentMetr } from "../../../../utils/get-price-rent-for-metr";
import { getCurrentRenterNameById } from "../../../../store/current-renter.store";
import { getWorkingPositionNameById } from "../../../../store/working-position.store";
import { getEstateConditionNameById } from "../../../../store/object-conditions.store";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};

export const FormatManagerName = (id) => {
  return useSelector(getUserNameById(id));
};

export const FormatPhone = (num) => {
  return <Box sx={{ whiteSpace: "nowrap" }}><Typography>{enterPhoneFormat(num)}</Typography> </Box>;
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
  const object =  useSelector(getObjectById(id));
  return getPriceForRentMetr(object)
};

export const UserAvatar = ({ path }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={path} alt="" style={{ width: "40px", borderRadius: "4px" }} />
    </Box>
  );
};
