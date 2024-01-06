import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import dayjs from "dayjs";
// utils
import { enterPhoneFormat } from "../../../../utils/data/enter-phone-format";
import { getPriceForRentMetr } from "../../../../utils/data/get-price-rent-for-metr";
// store
import { getMetroName } from "../../../../store/object-params/metro.store";
import { getObjectById } from "../../../../store/object/objects.store";
import { getUserNameById } from "../../../../store/user/users.store";
import { getDistrictName } from "../../../../store/object-params/districts.store";
import { getRentTypeNameById } from "../../../../store/object-params/rent-types.store";
import { getObjectTypeNameById } from "../../../../store/object-params/object-types.store";
import { getEstateTypeNameById } from "../../../../store/object-params/estate-types.store";
import { getObjectStatusNameById } from "../../../../store/object-params/object-status.store";
import { getCurrentRenterNameById } from "../../../../store/object-params/current-renter.store";
import { getWorkingPositionNameById } from "../../../../store/user-params/working-position.store";
import { getEstateConditionNameById } from "../../../../store/object-params/object-conditions.store";
import { getObjectPropertiesNameById } from "../../../../store/object-params/object-properties";
import { getTradeAreaNameById } from "../../../../store/object-params/object-trade-area";

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
  return useSelector(getDistrictName(id));
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

export const FormatObjectProperties = (id) => {
  return useSelector(getObjectPropertiesNameById(id));
};

export const FormatObjectTradeArea = (id) => {
  return useSelector(getTradeAreaNameById(id));
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

export const UserAvatar = ({ path, width = "30px" }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={path} alt="" style={{ width: width, borderRadius: "50%" }} />
    </Box>
  );
};
