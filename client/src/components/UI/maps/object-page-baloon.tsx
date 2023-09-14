import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import Loader from "../../common/loader/loader";
import Attribute from "../../common/map/baloon/attribute";
// utils
import { FormatDate } from "../../../utils/date/format-date";
// store
import { getUserNameById } from "../../../store/user/users.store";
import { getDistrictById } from "../../../store/object/districts.store";

const BaloonContainer = styled(Box)`
  width: 100%;
  height: 100px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: start;
`;

const ObjectPageBaloon = ({ object }) => {
  console.log("object", object);
  
  const date = FormatDate(object.created_at);
  const manager = useSelector(getUserNameById(object?.userId));
  const city = object?.location?.city;
  const district = useSelector(getDistrictById(object?.location?.district));
  const address = object?.location?.address;

  return object ? (
    <BaloonContainer>
      <Attribute title="Дата создания:" subTitle={date} />
      <Attribute title="Менеджер:" subTitle={manager} />
      <Attribute title="Город:" subTitle={city} />
      <Attribute title="Район:" subTitle={district} />
      <Attribute title="Адрес:" subTitle={address} />
    </BaloonContainer>
  ) : (
    <Loader height="90" />
  );
};

export default ObjectPageBaloon;
