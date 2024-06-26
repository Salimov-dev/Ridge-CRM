import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import dayjs from "dayjs";
// utils
import { enterPhoneFormat } from "@utils/data/enter-phone-format";
import { getPriceForRentMetr } from "@utils/data/get-price-rent-for-metr";
// store
import { getMetroList } from "@store/object-params/object-metro.store";
import { getObjectById } from "@store/object/objects.store";
import { getUserNameById } from "@store/user/users.store";
import { getDistrictName } from "@store/object-params/object-districts.store";
import { getRentTypesList } from "@store/object-params/object-rent-types.store";
import { getObjectTypeNameById } from "@store/object-params/object-types.store";
import { getEstateTypeNameById } from "@store/object-params/object-estate-types.store";
import { getObjectStatusNameById } from "@store/object-params/object-status.store";
import { getCurrentRenterNameById } from "@store/object-params/object-current-renter.store";
import { getEstateConditionNameById } from "@store/object-params/object-conditions.store";
import { getObjectPropertiesNameById } from "@store/object-params/object-properties";
import { getTradeAreaNameById } from "@store/object-params/object-trade-area";

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
  const rentTypes = useSelector(getRentTypesList());

  const type = rentTypes.find((m) => m._id === id);
  return type ? type.name : "";
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

export const FormatMetro = (id) => {
  const metroList = useSelector(getMetroList());
  const metro = metroList.find((m) => m._id === id);
  return metro ? metro.name : "";
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
