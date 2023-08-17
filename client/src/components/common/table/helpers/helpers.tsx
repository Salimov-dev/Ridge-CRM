import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import dayjs from "dayjs";
// store
import { getUserNameById } from "../../../../store/users.store";
import { getDistrictById } from "../../../../store/districts.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getMetroName } from "../../../../store/metro.store";
// utils
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";

export const FormatDate = (date) => {
  return dayjs(date).format("DD.MM.YY");
};

export const FormatManagerName = (id) => {
  return useSelector(getUserNameById(id));
};

export const FormatPhone = (num) => {
  return <Box sx={{ whiteSpace: "nowrap" }}>{enterPhoneFormat(num)}</Box>;
};

export const FormatDistrict = (id) => {
  return useSelector(getDistrictById(id));
};

export const FormatObjectStatus = (id) => {
  return useSelector(getObjectStatusNameById(id));
};

export const FormatMetro = (id) => {
  return useSelector(getMetroName(id));
};

export const UserAvatar = ({ path }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={path} alt="" style={{ width: "40px", borderRadius:'4px' }} />
    </Box>
  );
};
